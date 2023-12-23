import {defineMiddleware} from 'astro:middleware';
import {z} from 'astro/zod';

// There is probably a better way to share this!
// This list needs to match the enum in data/todos.ts.
const filterSchema = z.enum(['all', 'active', 'completed']).default('all');

// See https://docs.astro.build/en/guides/middleware/.
// `context` and `next` are automatically typed.
export const onRequest = defineMiddleware(async (context, next) => {
  if (context.request.method === 'GET') {
    context.locals.filter = filterSchema.parse(
      context.url.searchParams.get('filter')?.toString()
    );
  } else {
    // The current filter needs to be included for when partials are requested.
    // pages/index.astro uses `hx-vals` to make sure the filter
    // is included with every HTMX request.
    // Here we strip that back out and share it in the request's context.
    const formData = await context.request.clone().formData();
    context.locals.filter = filterSchema.parse(formData.get('filter'));
  }

  return next();
});
