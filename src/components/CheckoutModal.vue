<template>
    <div class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-background rounded-lg shadow-lg p-6 w-full max-w-md text-center border">
        <div class="text-green-600 dark:text-green-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle mx-auto"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        </div>
        <h3 class="text-2xl font-bold mb-2">¡Pedido Completado!</h3>
        <p class="text-muted-foreground mb-6">Tu pedido ha sido procesado correctamente.</p>
        <button 
          @click="$emit('finish')" 
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Continuar
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CheckoutModal',
    emits: ['finish']
  });
  </script>
  
  