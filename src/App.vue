<template>
  <div :class="{'dark': isDarkMode}" class="min-h-screen bg-background text-foreground transition-colors duration-300">
    <!-- Header -->
    <AppHeader 
      :isDarkMode="isDarkMode" 
      :searchQuery="searchQuery"
      :cart="cart"
      :activeView="activeView"
      @search="searchProducts"
      @toggle-theme="toggleTheme"
      @set-active-view="activeView = $event"
      @update:searchQuery="searchQuery = $event"
      @select-category="selectCategory"
    />

    <!-- Categories Navigation - Solo mostrar en la vista de productos -->
    <CategoryNav 
      v-if="activeView === 'products'"
      :categories="categories"
      :selectedCategory="selectedCategory"
      @select-category="selectCategory"
    />

    <!-- Main Content -->
    <main class="container py-6">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
        <p>{{ error }}</p>
        <button 
          @click="fetchProducts" 
          class="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-4 py-2"
        >
          Reintentar
        </button>
      </div>

      <!-- Products View -->
      <ProductsView 
        v-else-if="activeView === 'products'"
        :products="filteredProducts"
        @add-to-cart="addToCart"
      />

      <!-- Cart View -->
      <CartView 
        v-else-if="activeView === 'cart'"
        :cart="cart"
        :cartTotal="cartTotal"
        @update-quantity="updateCartItemQuantity"
        @remove-item="removeFromCart"
        @checkout="checkout"
        @continue-shopping="activeView = 'products'"
      />
    </main>

    <!-- Checkout Success Modal -->
    <CheckoutModal 
      v-if="showCheckoutModal"
      @finish="finishCheckout"
    />
  </div>

  <!-- Toast Notifications -->
  <ToastNotification />
</template>

<script lang="ts">
import { ref, reactive, watch, onMounted, defineComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';
import CategoryNav from './components/CategoryNav.vue';
import ProductsView from './views/ProductsView.vue';
import CartView from './views/CartView.vue';
import CheckoutModal from './components/CheckoutModal.vue';
import type { Product, CartItem } from './types';
import { toastService } from './services/toast.service';
import ToastNotification from './components/Toast.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    CategoryNav,
    ProductsView,
    CartView,
    CheckoutModal,
    ToastNotification
  },
  setup() {
    // Estado de la aplicación
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);
    const products = reactive<Product[]>([]);
    const categories = ref<string[]>([]);
    const selectedCategory = ref<string>('all');
    const searchQuery = ref<string>('');
    const activeView = ref<'products' | 'cart' | 'admin'>('products');
    const cart = reactive<CartItem[]>([]);
    const showAddProductModal = ref<boolean>(false);
    const showCheckoutModal = ref<boolean>(false);
    const editingProductIndex = ref<number | null>(null);
    const showUserMenu = ref<boolean>(false);
    const isDarkMode = ref<boolean>(false);
    const filteredProducts = reactive<Product[]>([]);
    const cartTotal = ref<number>(0);

    const updateFilteredProducts = () => {
      // Limpiar el array
      filteredProducts.splice(0, filteredProducts.length);
      
      let filtered = [...products];
      
      // Filtrar por categoría
      if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory.value);
      }
      
      // Filtrar por búsqueda
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        );
      }
      
      // Añadir los productos filtrados al array
      filteredProducts.push(...filtered);
    };

    // Actualizar cartTotal cuando cambie el carrito
    const updateCartTotal = () => {
      cartTotal.value = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Observar cambios en products, selectedCategory y searchQuery
    watch([() => [...products], selectedCategory, searchQuery], () => {
      updateFilteredProducts();
    }, { immediate: true, deep: true });

    // Observar cambios en el carrito
    watch(() => [...cart], () => {
      updateCartTotal();
    }, { immediate: true, deep: true });

    // Obtener productos de la API
    const fetchProducts = async (): Promise<void> => {
      loading.value = true;
      error.value = null;
      
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(apiUrl + '/products');
        const text = await response.text();
        const data = JSON.parse(text);
        
        // Añadir propiedades adicionales requeridas (stock y disponible)
        data.forEach((product: Product) => {
          product.stock = Math.floor(Math.random() * 20); // Stock aleatorio entre 0 y 19
          product.disponible = product.stock > 0;
        });
        
        // Vaciar y rellenar el array
        products.splice(0, products.length, ...data);
        
        // Obtener categorías únicas
        const uniqueCategories = [...new Set(data.map((product: { category: any; }) => product.category))] as string[];
        categories.value = uniqueCategories;
        
        // Actualizar productos filtrados
        updateFilteredProducts();
        
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Error desconocido';
      } finally {
        loading.value = false;
      }
    };

    // Seleccionar categoría
    const selectCategory = (category: string): void => {
      selectedCategory.value = category;
      // updateFilteredProducts se ejecutará automáticamente por el watch
    };

    // Formatear nombre de categoría
    const formatCategory = (category: string): string => {
      return category
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    // Buscar productos
    const searchProducts = (): void => {
      // updateFilteredProducts se ejecutará automáticamente por el watch
    };

    // Añadir producto al carrito
    const addToCart = (product: Product): void => {
      
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Incrementar cantidad si hay stock disponible
        if (product.stock > 0) {
          cart[existingItemIndex].quantity++;
          
          // Actualizar stock del producto
          const productIndex = products.findIndex(p => p.id === product.id);
          if (productIndex >= 0) {
            products[productIndex].stock--;
            products[productIndex].disponible = products[productIndex].stock > 0;
          }
          
          toastService.success('Producto añadido', `${product.title} añadido al carrito`);
        }
      } else {
        // Añadir nuevo item al carrito
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
          stock: product.stock
        });
        
        // Actualizar stock del producto
        const productIndex = products.findIndex(p => p.id === product.id);
        if (productIndex >= 0) {
          products[productIndex].stock--;
          products[productIndex].disponible = products[productIndex].stock > 0;
        }
        
        toastService.success('Producto añadido', `${product.title} añadido al carrito`);
      }
      
      // updateCartTotal se ejecutará automáticamente por el watch
    };

    // Actualizar cantidad de un item en el carrito
    const updateCartItemQuantity = (index: number, change: number): void => {
      // Obtener el producto original para verificar el stock total disponible
      const productIndex = products.findIndex(p => p.id === cart[index].id);
      
      const newQuantity = cart[index].quantity + change;
      
      // Verificar límite inferior
      if (newQuantity < 1) {
        return;
      }
      
      // Actualizar stock del producto
      if (productIndex >= 0) {
        products[productIndex].stock -= change;
        products[productIndex].disponible = products[productIndex].stock > 0;
      }
      
      // Actualizar cantidad en el carrito
      cart[index].quantity = newQuantity;
      
      if (change > 0) {
        toastService.success('Cantidad actualizada', 'Se ha incrementado la cantidad');
      } else {
        toastService.info('Cantidad actualizada', 'Se ha reducido la cantidad');
      }
      
      // updateCartTotal se ejecutará automáticamente por el watch
    };

    // Eliminar item del carrito
    const removeFromCart = (index: number): void => {
      // Devolver stock al producto
      const productIndex = products.findIndex(p => p.id === cart[index].id);
      if (productIndex >= 0) {
        // Devolver la cantidad exacta que había en el carrito
        const quantityToRestore = cart[index].quantity;
        products[productIndex].stock += quantityToRestore;
        products[productIndex].disponible = true;
      }
      
      // Eliminar del carrito
      cart.splice(index, 1);
      
      // updateCartTotal se ejecutará automáticamente por el watch
    };

    // Procesar pago
    const checkout = (): void => {
      showCheckoutModal.value = true;
    };

    // Finalizar proceso de pago
    const finishCheckout = (): void => {
      cart.splice(0, cart.length); // Vaciar carrito
      showCheckoutModal.value = false;
      activeView.value = 'products';
      toastService.success('Pedido completado', 'Tu pedido ha sido procesado correctamente');
    };

    // Cambiar tema
    const toggleTheme = (): void => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    };

    // Inicializar la aplicación
    onMounted(async () => {
      // Cargar preferencia de tema
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        isDarkMode.value = savedTheme === 'dark';
      } else {
        // Detectar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode.value = prefersDark;
      }
      
      await fetchProducts();
      
      // Cerrar menú de usuario al hacer clic fuera
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (showUserMenu.value && !target.closest('.relative')) {
          showUserMenu.value = false;
        }
      });
    });

    return {
      loading,
      error,
      products,
      categories,
      selectedCategory,
      searchQuery,
      activeView,
      cart,
      showAddProductModal,
      showCheckoutModal,
      editingProductIndex,
      showUserMenu,
      isDarkMode,
      filteredProducts,
      cartTotal,
      fetchProducts,
      selectCategory,
      formatCategory,
      searchProducts,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      checkout,
      finishCheckout,
      toggleTheme,
      toastService
    };
  }
});
</script>

<style>
@import './assets/main.css';
</style>