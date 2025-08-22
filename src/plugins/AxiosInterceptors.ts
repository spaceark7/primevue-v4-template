import type { AuthEntity } from '@/core/auth/AuthEntity';
import { EBreakPoint, EBreakPointVW } from '@/helpers/Enum';
import { useAppAuthStore } from '@/stores/AppAuthStore';
import { useConfirmationService, useDynamicDialogService } from '@/ui/composables/prime';
import LoginForm from '@/ui/views/auth/LoginForm.vue';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';


// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_KEY_NAME = import.meta.env.VITE_APP_API_KEY_NAME;
const API_KEY_VALUE = import.meta.env.VITE_APP_API_KEY_VALUE;
const API_CONTENT_TYPE = 'application/json';
const REFRESH_TOKEN_ENDPOINT = 'refresh-token';
const REFRESH_TOKEN_MAX_RETRY = 3;
const REQUEST_TIMEOUT = 30000;


const confirmation = useConfirmationService();
const dialog = useDynamicDialogService();

let isRefreshing = false;
let currentRetryCount = 0;
const refreshAndRetryQueue: RetryQueueItem[] = [];

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig<any> => {
  if (config.headers) {
    const headers = JSON.parse(JSON.stringify(config.headers));
    console.info('[Axios] onRequest.headers:', headers, config.url);

    if (headers['Require-Token'] && headers['Require-Token'] !== false) {
      const store = getAuthStoreState();

      if (!store) {
        console.warn('[Axios] onRequest: No auth store found');
        return config;
      }

      const accessToken = store.accessToken;

      console.log(
        '[Axios] onRequest.accessToken:',
        accessToken,
        new Date().getTime(),
      );

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    if (headers['Accept-Language'] === undefined) {
      // config.headers['Accept-Language'] = useLang().currentLang.value;
    }
  }

  console.info('[Axios] onRequest.config:', config?.headers);

  return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  console.info('[Axios] onRequestError:', error);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse<any, any> => {
  console.info('[Axios] onResponse:', response);
  return response;
};
const onResponseError = async (
  error: AxiosError | any,
): Promise<AxiosError | AxiosResponse> => {
  // const { authToken } = getAppADState();
  // console.error('[Axios:onResponseError] error', authToken);

  const originalRequest = error.config as AxiosRequestConfig;
  const headers = JSON.stringify(originalRequest?.headers)
    ? JSON.parse(JSON.stringify(originalRequest?.headers))
    : null;

  if (!headers) {
    console.info('[Axios] onResponseError.ForceLogout:', '1');
    //* force logout
    forceLogout();
    return Promise.reject(error);
  }
  if (currentRetryCount === REFRESH_TOKEN_MAX_RETRY) {
    console.info('[Axios] onResponseError.ForceLogout:', '2');
    //* force logout
    forceLogout();
    return Promise.reject(error);
  }
  //&& headers['Require-Token']
  if (error.response?.status === 401 && headers['Require-Token']) {
    //const { accessToken: currentToken } = getAppADState();
    console.info(
      '[Axios] onResponseError.Require-Token:',
      headers['Require-Token'],
      originalRequest.url,
      refreshAndRetryQueue.length,
      isRefreshing,
    );

    if (originalRequest && originalRequest.headers) {
      console.info(
        '[Axios] onResponseError.Retry-Count:',
        headers['Retry-Count'],
      );

      if (headers['Retry-Count'] === REFRESH_TOKEN_MAX_RETRY) {
        console.info('[Axios] onResponseError.ForceLogout:', '3');
        console.info(
          '[Axios] onResponseError.Retry-Count-Max:',
          REFRESH_TOKEN_MAX_RETRY,
        );

        //* force logout
        forceLogout();
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const resRefreshToken = await getRefreshToken()
          console.info(
            '[Axios] onResponseError.resRefreshToken:',
            resRefreshToken,
          );

          if (resRefreshToken.status === 200) {
            const remoteResponse = resRefreshToken.data;
            const newData = remoteResponse.data;
            await setAuthStoreState(newData as Partial<AuthEntity>);

            // await setAppADState(newData);
            //await debounceTime(2000);
            console.info('[Axios] onResponseError.setNewAppADState:', newData);

            // set token
            let retryCount = 1;
            if (originalRequest.headers['Retry-Count']) {
              retryCount += originalRequest.headers['Retry-Count'] as number;
            }

            originalRequest.headers['Authorization'] =
              `Bearer ${newData.accessToken}`;
            originalRequest.headers['Require-Token'] = true;
            originalRequest.headers['Retry-Count'] = retryCount;
            console.info('[Axios] onResponseError.Retry-Count:', retryCount);

            // call original instance again
            console.info(
              '[Axios] onResponseError.refreshAndRetryQueue:',
              refreshAndRetryQueue.length,
            );

            // Retry all requests in the queue with the new token
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              config.headers = {
                ...config.headers,
                'Require-Token': true,
                'Retry-Count': retryCount,
                Authorization: `Bearer ${newData.accessToken}`,
              };
              console.log('[Axios] onResponseError.refreshAndRetryQueue:', config);
              axios
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });

            // Clear the queue
            refreshAndRetryQueue.length = 0;

            //return axios(originalRequest);
            return Promise.resolve(
              axios(originalRequest)
                .then((res: AxiosResponse) => {
                  return res;
                })
                .catch((error: AxiosError) => {
                  return Promise.reject(error);
                }),
            );
          } else {
            isRefreshing = true;
            return Promise.reject(error);
          }
        } catch (e) {
          isRefreshing = false;
          console.error('[Axios] onResponseError.getRefreshToken.catch:', e);
          // Clear the queue if the refresh token request fails
          refreshAndRetryQueue.length = 0;


          // Log the error
          console.error('[Axios] onResponseError.getRefreshToken.catch.error:', e);

          // Reject all queued requests with the error
          refreshAndRetryQueue.forEach(({ reject }) => reject(e));

          // Clear the queue
          refreshAndRetryQueue.length = 0;

        }
      } else {
        // Add the original request to the queue
        console.log('[Axios] refreshAndRetryQueue', refreshAndRetryQueue);

        return new Promise((resolve, reject) => {
          refreshAndRetryQueue.push({
            config: originalRequest,
            resolve,
            reject,
          });
        });
      }
    } else {
      //#region force logout
      console.info('[Axios] onResponseError.ForceLogout:', '3');
      forceLogout();
    }
  } else {
    console.log('[Axios] onResponseError.Beside401:status', error.response?.status);
    console.info('[Axios] onResponseError.Beside401:', '-');
    forceLogout();

  }

  return Promise.reject(error);
};

const setAuthStoreState = async (newState: Partial<AuthEntity>) => {
  const appAuthStore = useAppAuthStore()
  await appAuthStore.setState(newState);

  // Set the authentication state in your store
};

const getRefreshToken = async (token?: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      [API_KEY_NAME]: API_KEY_VALUE,
      'Require-Token': false,
      //Authorization: `Bearer ${token}`,
      // credentials: 'include',
    },
    withCredentials: true,
  };

  // new instance
  return Promise.resolve(
    axios
      .get(`${BASE_URL}/${REFRESH_TOKEN_ENDPOINT}`, options)
      .then((res: AxiosResponse) => res)
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          const axiosResponse = error.response;
          const remoteResponse = axiosResponse?.data;

          console.info(
            `[Axios] getRefreshToken.catch.error.remote:`,
            `${error.message} - ${JSON.stringify(remoteResponse)}`,
          );

        } else {
          console.info(
            `[Axios] getRefreshToken.catch.error.internal:`,
            `${error}`,
          );
          forceLogout();

        }
        currentRetryCount++;
        return Promise.reject(error);
      }).finally(() => {
        console.info('[Axios] getRefreshToken.finally');
        isRefreshing = true;

      }),
  );
};

const getAuthStoreState = () => {
  const appAuthStore = useAppAuthStore();
  return appAuthStore.getState as AuthEntity;
};

const forceLogout = () => {
  //* appADStore
  const appADStore = useAppAuthStore();
  appADStore.logout();
  appADStore.resetState();

  confirmation.require({
    header: 'Session Expired',
    message: 'Your session has expired. Please log in again.',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'No',
    acceptLabel: 'Yes',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      dialog.open(LoginForm, {
        props: {
          header: 'Login',
          style: {
            width: '30vw',
          },
          breakpoints: {
            [EBreakPoint.PhoneSM + 'px']: EBreakPointVW['75vw'],
            [EBreakPoint.TabletMD + 'px']: EBreakPointVW['75vw'],
            [EBreakPoint.NotebookLG + 'px']: EBreakPointVW['75vw'],
          },
          modal: true,
        },
        onClose: () => {
          window.location.reload();
        },
        data: {
          hideForgot: true,
        },
      });
    },
    reject: () => {
      window.location.reload();
      // setTimeout(function () {
      //   window.location.reload();
      // }, 10000);
    },
    onHide: () => {
      window.location.reload();
    },
  });

  // toast.add({
  //   severity: 'error',
  //   summary: i18n.global.t('error_pages.session_expired'),
  //   detail: i18n.global.t('error_pages.session_expired_desc'),
  //   life: 10000,
  // });

  console.log('[Axios] forceLogout:');
};

export const setupInterceptors = (axiosInstance: AxiosInstance) :AxiosInstance =>  {
  axiosInstance.interceptors.request.use(onRequest as any, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  axiosInstance.defaults.headers.common[API_KEY_NAME] = API_KEY_VALUE;
  axiosInstance.defaults.headers.common['Require-Token'] = true;
  //axiosInstance.defaults.headers.get['Content-Type'] = API_CONTENT_TYPE;
  axiosInstance.defaults.headers.post['Content-Type'] = API_CONTENT_TYPE;
  axiosInstance.defaults.headers.put['Content-Type'] = API_CONTENT_TYPE;
  axiosInstance.defaults.headers.patch['Content-Type'] = API_CONTENT_TYPE;
  //axiosInstance.defaults.headers.delete['Content-Type'] = API_CONTENT_TYPE;
  axiosInstance.defaults.timeout = REQUEST_TIMEOUT;
  axiosInstance.defaults.baseURL = BASE_URL;

  return axiosInstance;
}
