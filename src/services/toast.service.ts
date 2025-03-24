import { reactive } from 'vue';

export interface Toast {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  removing?: boolean;
}

const toasts = reactive<Toast[]>([]);

export const toastService = {
  toasts,
  
  success(title: string, message: string, duration = 1000) {
    this.add({ title, message, type: 'success', duration });
  },
  
  info(title: string, message: string, duration = 1000) {
    this.add({ title, message, type: 'info', duration });
  },
  
  add(toast: Toast) {
    const newToast = { ...toast, duration: toast.duration || 1000 };
    toasts.push(newToast);
    
    setTimeout(() => {
      const index = toasts.indexOf(newToast);
      if (index !== -1) {
        toasts[index].removing = true;
        setTimeout(() => {
          const removeIndex = toasts.indexOf(newToast);
          if (removeIndex !== -1) {
            toasts.splice(removeIndex, 1);
          }
        }, 300); // Duración de la animación
      }
    }, newToast.duration);
  },
  
  remove(index: number) {
    toasts[index].removing = true;
    setTimeout(() => {
      toasts.splice(index, 1);
    }, 300); // Duración de la animación
  }
};