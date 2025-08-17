import type { ToastMessageOptions } from 'primevue/toast';
import ToastEventBus from 'primevue/toasteventbus';
// import { PRIME } from '@/config';
// import i18n from '@/plugins/i18nPlugin';

export const useToastService = () => {
  // const toast2 = {
  //   add: (message: ToastMessageOptions) => ToastEventBus.emit('add', message),
  //   removeGroup: (group: any) => ToastEventBus.emit('remove-group', group),
  //   removeAllGroups: () => ToastEventBus.emit('remove-all-groups'),
  // };

  const add = (options: ToastMessageOptions) =>
    ToastEventBus.emit('add', options);

  const removeGroup = (group: any) => {
    ToastEventBus.emit('remove-group', group);
  };

  const removeAllGroups = () => {
    ToastEventBus.emit('remove-all-groups');
  };

  const successSaved = (options?: ToastMessageOptions) =>
    ToastEventBus.emit('add', {
      ...options,
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully saved',
      life: 3000,
    });

  const errorSaving = (options?: ToastMessageOptions) =>
    ToastEventBus.emit('add', {
      ...options,
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while saving',
      life: 3000,
    });

  const successDeleted = (options?: ToastMessageOptions) =>
    ToastEventBus.emit('add', {
      ...options,
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully deleted',
      life: 3000,
    });

  const errorDeleting = (options?: ToastMessageOptions) =>
    ToastEventBus.emit('add', {
      ...options,
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while deleting',
      life: 3000,
    });

  return {
    add,
    removeGroup,
    removeAllGroups,
    successSaved,
    errorSaving,
    successDeleted,
    errorDeleting,
  };
};
