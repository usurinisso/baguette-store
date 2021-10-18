import { BaguetteWithCartsAndShopAndOrder, FullBaguette } from 'models/baguette';
export interface FullShop {
  id: number;

  address: string;

  phone: string;

  workHours: string;

  shopImage: string;
}

export interface ShopsWithBaguettes extends FullShop {
  baguettes?: FullBaguette[];
}
