export class CustomerService {
  async getCustomersSmall() {
    const res = await fetch('/demo/data/customers-small.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }

  async getCustomers(offset: number, limit: number) {
    const res = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${offset}`,
      {
        headers: { 'Cache-Control': 'no-cache' },
      },
    );
    const d = await res.json();
    return d.users;
  }

  async getCustomersMedium() {
    const res = await fetch('/demo/data/customers-medium.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }

  async getCustomersLarge() {
    const res = await fetch('/demo/data/customers-large.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }
}
