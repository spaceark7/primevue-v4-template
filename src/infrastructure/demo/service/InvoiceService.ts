export class InvoiceService {
  async getInvoices(offset = 0, limit = 10, first_name = '') {
    const res = await fetch(
      `https://dummyjson.com/carts?skip=${offset}&limit=${limit}&search=${first_name}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          'X-Jsio-token': 'aa793684d4c5e7683174f70bcc4ce071',
        },
      },
    );
    const d = await res.json();
    return {
      data: d.carts,
      total: d.total,
      skip: d.skip,
      limit: d.limit,
    } as InvoiceSchema;
  }

  async getUserInvoices(id: number): Promise<User> {
    const res = await fetch(`https://dummyjson.com/users/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Jsio-token': 'aa793684d4c5e7683174f70bcc4ce071',
      },
    });
    const d = await res.json();
    return d;
  }
}

export interface InvoiceSchema {
  data: Datum[];
  total: number;
  skip: number;
  limit: number;
}

export interface Datum {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: Date;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

export interface Hair {
  color: string;
  type: string;
}
