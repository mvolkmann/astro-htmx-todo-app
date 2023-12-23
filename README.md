# astro-htmx-todo-app

This app was heavily inspired by
https://github.com/tony-sull/todomvc-astro-htmx
which was created by Tony Sullivan.

I'm still trying to decide what I think about this approach.
I do love HTMX, but I think there are two issues with using it with Astro.

The first is that it requires a large number of small files.
Perhaps some developers feel that is a pro rather than a con.
But you have to look at a lot of files to
get the full picture of what is going on.

The second is that I wish it wasn't on me to handle
various HTTP verbs in the same source file.
Having to write code like the following
(from src/pages/partials/todos/[id].astro) feels icky:

```js
if (Astro.request.method === 'DELETE') {
  deleteById(id);
} else if (Astro.request.method === 'PATCH') {
  todo = updateTodo(id, {done: !todo.done});
} else {
  return Astro.redirect(null, 404);
}
```

It seems that Astro requires writing code like this
in order to use it with HTMX.
