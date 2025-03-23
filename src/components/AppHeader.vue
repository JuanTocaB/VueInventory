<template>
<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center">
      <div class="flex items-center gap-4 md:gap-8">
        <h1 
          class="text-xl font-bold cursor-pointer" 
          @click="handleLogoClick"
        >
          VueInventory
        </h1>
        <div class="relative hidden md:block">
          <div class="relative">
            <input 
              v-model="searchQueryLocal" 
              type="text" 
              placeholder="Buscar productos..." 
              class="h-10 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              @keyup.enter="handleSearch"
            />
            <button 
              @click="handleSearch" 
              class="absolute right-1 top-1 h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
        </div>
      </div>
        <div class="flex items-center ml-auto gap-4">
          <button 
            @click="$emit('toggle-theme')" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
          >
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            <span class="sr-only">Cambiar tema</span>
          </button>
          <button 
            @click="$emit('set-active-view', 'cart')" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 relative"
          >
            <span class="hidden md:inline-block mr-2">Carrito</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span 
              v-if="cart.length > 0" 
              class="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            >
              {{ cart.length }}
            </span>
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue';
import type { CartItem } from '../types';

export default defineComponent({
  name: 'AppHeader',
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    },
    searchQuery: {
      type: String,
      required: true
    },
    cart: {
      type: Array as PropType<CartItem[]>,
      required: true
    },
    activeView: {
      type: String,
      required: true
    }
  },
  emits: ['search', 'toggle-theme', 'toggle-user-menu', 'set-active-view', 'update:searchQuery', 'select-category'],
  setup(props, { emit }) {
    const searchQueryLocal = ref(props.searchQuery);

    watch(() => props.searchQuery, (newVal) => {
      searchQueryLocal.value = newVal;
    });

    watch(searchQueryLocal, (newVal) => {
      emit('update:searchQuery', newVal);
    });

    const handleSearch = () => {
      emit('search');
    };

    const handleLogoClick = () => {
      emit('set-active-view', 'products');
      emit('select-category', 'all');
    };

    return {
      searchQueryLocal,
      handleSearch,
      handleLogoClick
    };
  }
});
</script>