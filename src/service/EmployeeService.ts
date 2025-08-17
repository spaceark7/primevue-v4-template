export class EmployeeService {
  async getRandomEmployee(): Promise<User> {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user: User = {
      name: data.results[0].name.first + ' ' + data.results[0].name.last,
      avatar: data.results[0].picture.medium,
    };
    return user;
  }

  async getEmployeeChart(): Promise<any> {
    const res = await fetch('/demo/data/org-chart.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const { data } = await res.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  }

  async getEmployeeChartSeparated(): Promise<any> {
    const res = await fetch('/demo/data/org-chart-separated.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const { data } = await res.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  }
}

type User = {
  name: string;
  avatar: string;
};
