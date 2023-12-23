/// <reference types="astro/client" />

// Astro.locals is an object that enables setting and sharing
// request-specific information across endpoints and pages.
// This is available in all Astro components and API endpoints.
declare namespace App {
  interface Locals {
    filter: import('@data/todos').TodoFilter;
  }
}
