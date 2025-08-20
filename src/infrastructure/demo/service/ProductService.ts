export class ProductService {
  async getProductsSmall() {
    const res = await fetch('/demo/data/products-small.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }

  async getProductsCrud() {
    const res = await fetch('/demo/data/products.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }

  async getProducts(offset = 0, limit = 10, first_name = '') {
    const res = await fetch(
      `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${limit}&search=${first_name}`,
      {
        headers: { 'Cache-Control': 'no-cache' },
      },
    );
    const d = await res.json();
    return d;
  }

  async getInvoices(offset = 0, limit = 10, first_name = '') {
    const res = await fetch(
      `https://api.jsonserver.io/api/v1/invoices?offset=${offset}&limit=${limit}&search=${first_name}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          'X-Jsio-token': 'aa793684d4c5e7683174f70bcc4ce071',
        },
      },
    );
    const d = await res.json();
    return d;
  }

  async getProductsMixed() {
    const res = await fetch('/demo/data/products-mixed.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }

  async getProductsWithOrdersSmall() {
    const res = await fetch('/demo/data/products-orders-small.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }

  async getProductsWithOrdersLarge() {
    const res = await fetch('/demo/data/products-orders.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }
}
