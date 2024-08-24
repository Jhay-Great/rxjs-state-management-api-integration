
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


// oder data
export interface OrderData {
    item: OrderItem
}

// product item
export interface OrderItem {
    orderId: string;
    name: string | undefined;
    price: number | undefined;
    quantityCount: number;
    productId: string | undefined;
}