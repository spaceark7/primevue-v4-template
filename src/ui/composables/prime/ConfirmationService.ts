import type { ConfirmationOptions } from 'primevue/confirmationoptions';
import ConfirmationEventBus from 'primevue/confirmationeventbus';
// import i18n from '@/plugins/i18nPlugin';

export const useConfirmationService = () => {
  const require = (options: ConfirmationOptions) =>
    ConfirmationEventBus.emit('confirm', options);

  const close = () => {
    ConfirmationEventBus.emit('close');
  };

  const saveProceed = (options?: ConfirmationOptions) =>
    ConfirmationEventBus.emit('confirm', {
      ...options,
      header: 'Confirmation',
      message: 'Message',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'No',
      acceptLabel: 'Yes',
      rejectClass: 'p-button-secondary p-button-outlined',
      acceptClass: 'p-button-success',
    });

  const deleteSelected = (options?: ConfirmationOptions) =>
    ConfirmationEventBus.emit('confirm', {
      ...options,
      header: 'Confirmation',
      message: 'Are you sure you want to delete the selected items?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'No',
      acceptLabel: 'Yes',
      rejectClass: 'p-button-secondary p-button-outlined',
      acceptClass: 'p-button-danger',
    });

  return { require, close, saveProceed, deleteSelected };
};
