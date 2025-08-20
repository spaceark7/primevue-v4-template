export class IconService {
  icons: any[];
  selectedIcon: any;

  constructor() {
    this.icons = [];
    this.selectedIcon = null;
  }

  async getIcons() {
    const res = await fetch('/demo/data/icons.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.icons;
  }

  getIcon(id: number) {
    if (this.icons) {
      this.selectedIcon = this.icons.find((x) => x.properties.id === id);
      return this.selectedIcon;
    }
  }
}
