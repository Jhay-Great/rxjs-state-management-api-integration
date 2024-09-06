
export interface imageData {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
}

  export interface Product {
    image: imageData;
    name: string;
    category: string;
    price: number;
    id: string;
  }
  export type ProductList = Product[];
  export interface Dessert {
    dessert: Product[];
  }


// oder data
export interface OrderData {
    item: OrderItem
}

// product item
export interface OrderItem {
    orderId: string;
    // name: string;
    // price: number;
    // productId: string;
    name: string | undefined;
    price: number | undefined;
    totalQuantityPrice: number
    productId: string | undefined;
    quantityCount: number;
}