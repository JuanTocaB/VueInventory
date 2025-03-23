<template>
    <nav class="border-b bg-muted/40">
      <div class="container overflow-auto">
        <div class="flex space-x-2 py-3">
          <button 
            @click="$emit('select-category', 'all')" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 whitespace-nowrap"
            :class="{'bg-accent text-accent-foreground': selectedCategory === 'all'}"
          >
            Todos los productos
          </button>
          <button 
            v-for="category in categories" 
            :key="category" 
            @click="$emit('select-category', category)" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 whitespace-nowrap"
            :class="{'bg-accent text-accent-foreground': selectedCategory === category}"
          >
            {{ formatCategory(category) }}
          </button>
        </div>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  
  export default defineComponent({
    name: 'CategoryNav',
    props: {
      categories: {
        type: Array as PropType<string[]>,
        required: true
      },
      selectedCategory: {
        type: String,
        required: true
      }
    },
    emits: ['select-category'],
    setup() {
      const formatCategory = (category: string): string => {
        return category
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };
  
      return {
        formatCategory
      };
    }
  });
  </script>
  
  