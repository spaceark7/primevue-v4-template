import 'vue-router';

// To ensure it is treated as a module, add at least one `export` statement
export {};

// Decalre the RouteMeta interface for custom route meta fields
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    breadcrumb?: Breadcrumb[];
    requiresAuth?: boolean;
    actionsAcl?: string[];
  }

  interface Breadcrumb {
    name: string;
    path?: string | undefined;
  }
}
