
export interface imageData {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
}

  export interface Product {
    image: ImageData;
    name: string;
    category: string;
    price: number;
    id: string;
  }
  export type productList = Product[];


// oder data
export interface OrderData {
    item: OrderItem
}

// product item
export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    total: number;
}