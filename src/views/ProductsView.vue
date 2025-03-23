<template>
    <div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow transition-shadow duration-300"
        >
          <div class="p-4 flex flex-col h-full">
            <div class="relative pt-[100%] mb-4 bg-muted rounded-md overflow-hidden">
              <img 
                :src="product.image" 
                :alt="product.title" 
                class="absolute top-0 left-0 w-full h-full object-contain p-2"
              />
            </div>
            <h3 class="font-semibold mb-2 line-clamp-2" :title="product.title">
              {{ product.title }}
            </h3>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-500">
                <svg v-for="i in Math.floor(product.rating.rate)" :key="'star-'+i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><path d="m12 2-2.2 6.6a1 1 0 0 1-.95.69H2.5l5.5 4a1 1 0 0 1 .36 1.12L6.2 21.02l5.8-4.2a1 1 0 0 1 1.2 0l5.8 4.2-2.16-6.61a1 1 0 0 1 .36-1.12l5.5-4h-6.35a1 1 0 0 1-.95-.69L12 2Z"/></svg>
                <svg v-if="product.rating.rate % 1 > 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-half"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"/></svg>
              </div>
              <span class="text-muted-foreground text-sm ml-1">({{ product.rating.count }})</span>
            </div>
            <div class="text-lg font-bold mb-2">${{ product.price.toFixed(2) }}</div>
            <div class="mt-auto">
              <div class="text-sm mb-2">
                <span :class="product.stock > 0 ? 'text-green-600 dark:text-green-500' : 'text-destructive'">
                  {{ product.stock > 0 ? `${product.stock} en stock` : 'No disponible' }}
                </span>
              </div>
              <button 
                @click="$emit('add-to-cart', product)" 
                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full"
                :disabled="product.stock <= 0"
                :class="{'opacity-50 cursor-not-allowed': product.stock <= 0}"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Empty State -->
      <div v-if="products.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search mx-auto mb-4 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <h2 class="text-2xl font-semibold">No se encontraron productos</h2>
        <p class="text-muted-foreground mt-2">Intenta con otra búsqueda o categoría</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { Product } from '../types';
  
  export default defineComponent({
    name: 'ProductsView',
    props: {
      products: {
        type: Array as PropType<Product[]>,
        required: true
      }
    },
    emits: ['add-to-cart']
  });
  </script>
  
  