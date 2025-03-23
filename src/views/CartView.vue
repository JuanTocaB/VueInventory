<template>
    <div class="max-w-4xl mx-auto">
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h2 class="text-2xl font-bold mb-6">Tu Carrito</h2>
        
        <div v-if="cart.length === 0" class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart mx-auto mb-4 text-muted-foreground"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <h3 class="text-xl font-semibold">Tu carrito está vacío</h3>
          <p class="text-muted-foreground mt-2">Añade algunos productos para continuar</p>
          <button 
            @click="$emit('continue-shopping')" 
            class="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Seguir comprando
          </button>
        </div>
        
        <div v-else>
          <div class="border-b pb-4 mb-4">
            <div v-for="(item, index) in cart" :key="index" class="flex items-center py-4 border-b last:border-b-0">
              <div class="h-20 w-20 bg-muted rounded-md overflow-hidden mr-4">
                <img :src="item.image" :alt="item.title" class="h-full w-full object-contain p-2" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold">{{ item.title }}</h3>
                <div class="text-muted-foreground">${{ item.price.toFixed(2) }}</div>
              </div>
              <div class="flex items-center">
                <button 
                  @click="$emit('update-quantity', index, -1)" 
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-8 w-8"
                  :disabled="item.quantity <= 1"
                  :class="{'opacity-50': item.quantity <= 1}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>
                </button>
                <span class="mx-3">{{ item.quantity }}</span>
                <button 
                  @click="$emit('update-quantity', index, 1)" 
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-8 w-8"
                  :disabled="item.quantity >= item.stock"
                  :class="{'opacity-50': item.quantity >= item.stock}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
              <div class="text-right ml-4">
                <div class="font-bold">${{ (item.price * item.quantity).toFixed(2) }}</div>
                <button 
                  @click="$emit('remove-item', index)" 
                  class="text-destructive hover:text-destructive/80 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex justify-between items-center text-xl font-bold mb-6">
            <span>Total:</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
          
          <div class="flex justify-between">
            <button 
              @click="$emit('continue-shopping')" 
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Seguir comprando
            </button>
            <button 
              @click="$emit('checkout')" 
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Proceder al pago
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { type CartItem } from '../types';
  
  export default defineComponent({
    name: 'CartView',
    props: {
      cart: {
        type: Array as PropType<CartItem[]>,
        required: true
      },
      cartTotal: {
        type: Number,
        required: true
      }
    },
    emits: ['update-quantity', 'remove-item', 'checkout', 'continue-shopping']
  });
  </script>
  
  