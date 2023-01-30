export interface SaleResp {
  page: number;
  dataSale: DataSale[];
}

export interface DataSale {
  id: string;
  quantity: number;
  totalprice: number;
  status: boolean;
  createat: Date;
  updateAt: Date;
  client: Client;
  product: Product;
  lot: Lot;
}

export interface Client {
  id: string;
  name: string;
  surname: string;
  dni: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  status: boolean;
  createAt: Date;
  updateAt: Date;
}

export interface Lot {
  id: string;
  quantityLiters: number;
  code: string;
  discount: number;
  discountReason: string;
  typeLot: string;
  costLiter: number;
  reusedBottles: number;
  lotTotalCost: number;
  status: boolean;
  createAt: Date;
  updateAt: Date;
  expensesPerLot: ExpensesPerLot[];
}

export interface ExpensesPerLot {
  id: string;
  value: number;
  status: boolean;
  createAt: Date;
  updateAt: Date;
}

export interface Product {
  id: string;
  title: string;
  code: string;
  description: string;
  stock: number;
  price: number;
  status: boolean;
  createAt: Date;
  updateAt: Date;
}

export interface Sale {
  id?: '';
  clientId: '';
  productId: '';
  lotId: '';
  quantity: 0;
  totalprice: 0;
}
