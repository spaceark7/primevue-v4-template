import type {
  DynamicDialogInstance,
  DynamicDialogOptions,
} from 'primevue/dynamicdialogoptions';
import DynamicDialogEventBus from 'primevue/dynamicdialogeventbus';
import { markRaw } from 'vue';

export const useDynamicDialogService = () => {
  const open = (
    content: any,
    options?: DynamicDialogOptions,
  ): DynamicDialogInstance => {
    const instance = {
      content: content && markRaw(content),
      options: options || {},
      data: options && options.data,
      close: (params: any) => {
        DynamicDialogEventBus.emit('close', { instance, params });
      },
    };

    DynamicDialogEventBus.emit('open', { instance });

    return instance;
  };

  return { open };
};
