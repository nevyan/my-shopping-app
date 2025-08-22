

export interface Option {
  option_type: string;
  option_name: string;
  option: (number | string)[];
}

export interface Product {
  id: string;
  product_name: string;
  brand: string;
  price: number;
  image: string;
  category: string; 
  selectible_option?: Option;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
    selectedOption: number | string | null; 

}

export interface Option {
  option_type: string;
  option_name: string;
  option: (number | string)[];
}

export interface Product {
  id: string;
  product_name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  selectible_option?: Option;
  description?: string;     
  stock_quantity?: number;  
}


export interface CartItem extends Product {
  quantity: number;
  selectedOption: number | string | null;
}