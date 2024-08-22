export interface productCategory {
    dessert: string;
}

export interface productLists {
    // image: {
    //     [key:string]: string;
    // },
    image: imageData;
    name: string;
    category: string;
    price: number;
    id: string;
}[]

export interface imageData {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
}

// export type productData = productList[];

export interface productData {
    dessert: productLists[];
  }

  export interface Product {
    image: ImageData;
    name: string;
    category: string;
    price: number;
    id: string;
  }
  
  export type productList = Product[];