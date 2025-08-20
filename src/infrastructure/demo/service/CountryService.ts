export class CountryService {
  async getCountries() {
    const res = await fetch('/demo/data/countries.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }
  async getRegions() {
    const res = await fetch(
      'https://raw.githubusercontent.com/yusufsyaifudin/wilayah-indonesia/master/data/list_of_area/indonesia-region.min.json',
      {
        method: 'GET',
      },
    );
    const d = await res.json();
    return d;
  }
}
