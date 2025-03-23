<template>
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div 
        v-for="(toast, index) in toastService.toasts" 
        :key="index"
        class="bg-card border rounded-md shadow-md p-4 min-w-[300px] transform transition-all duration-300 ease-in-out"
        :class="{
          'translate-y-0 opacity-100': true,
          'translate-y-2 opacity-0': toast.removing,
          'border-green-500': toast.type === 'success',
          'border-red-500': toast.type === 'error',
          'border-yellow-500': toast.type === 'warning',
          'border-blue-500': toast.type === 'info'
        }"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0 mr-3">
            <!-- Icono según el tipo -->
            <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
            <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <svg v-else-if="toast.type === 'warning'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <div class="flex-1">
            <p class="font-medium">{{ toast.title }}</p>
            <p class="text-sm text-muted-foreground">{{ toast.message }}</p>
          </div>
          <button 
            @click="toastService.remove(index)" 
            class="flex-shrink-0 ml-3 text-muted-foreground hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import { toastService } from '../services/toast.service';
  
  export default defineComponent({
    name: 'ToastNotification',
    setup() {
      return {
        toastService
      };
    }
  });
</script>