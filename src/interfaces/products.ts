export interface Products {
  brandName: string;
  colour: string;
  id: number;
  imageUrl: string;
  isSellingFast?: boolean;
  name: string;
  price: {
    currency: string;
    current: {
      value: number;
      text: string;
    };
    previous: { value: null | number; text: string };
  };
  productCode?: number;
  productType: string;
  url?: string;
}
