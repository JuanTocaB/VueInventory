export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    stock: number;
    disponible: boolean;
  }
  
  export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
  }