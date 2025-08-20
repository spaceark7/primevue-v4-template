export class FileService {
  async getFiles() {
    const res = await fetch('/demo/data/file-management.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.files;
  }

  async getMetrics() {
    const res = await fetch('/demo/data/file-management.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.metrics;
  }

  async getFoldersSmall() {
    const res = await fetch('/demo/data/file-management.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.folders_small;
  }

  async getFoldersLarge() {
    const res = await fetch('/demo/data/file-management.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.folders_large;
  }
}
