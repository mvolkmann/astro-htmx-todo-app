import {defineMiddleware} from 'astro:middleware';
import {z} from 'astro/zod';

// This list needs to match the enum in data/todos.ts.
const filterSchema = z.enum(['all', 'active', 'completed']).default('all');

// Every request passes through this middleware.
// Its purpose is to update the context with the current filter value.
// It would be easier to just use sessionStorage!
export const onRequest = defineMiddleware(async (context, next) => {
  // For all GET requests, copy the "filter" query parameter into the context.
  if (context.request.method === 'GET') {
    context.locals.filter = filterSchema.parse(
      context.url.searchParams.get('filter')?.toString()
    );
  } else {
    // For all non-GET requests, copy the "filter" value
    // from the form data into the context.

    // The current filter needs to be included for when partials are requested.
    // pages/index.astro uses `hx-vals` to make sure the filter
    // is included with every HTMX request.
    // Here we strip that back out and share it in the request's context.
    const formData = await context.request.clone().formData();
    context.locals.filter = filterSchema.parse(formData.get('filter'));
  }

  // src/pages/index.astro includes the filter value in the context
  // when it sends a POST to /partials/todos for adding a new todo.
  return next();
});
