import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Link,
  Outlet,
  ReactRouter,
  RootRoute,
  Route,
  RouterProvider,
  useParams,
} from '@tanstack/react-router';

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div>
        <Link
          to="/"
          activeProps={{ style: { color: 'red' } }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/$id"
          params={{
            id: '1',
          }}
          activeProps={{ style: { color: 'red' } }}
          activeOptions={{ exact: true }}
        >
          Blog
        </Link>
        <Link
          to="/$id/edit"
          params={{
            id: '2',
          }}
          activeProps={{ style: { color: 'red' } }}
          activeOptions={{ exact: true }}
        >
          Blog Edit
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <h1>Home Page</h1>,
});

const blogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$id',
  component: () => {
    const { id } = useParams({ from: '/$id' });
    return <h1>Blog Page {id}</h1>;
  },
});

const blogEditRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$id/edit',
  component: () => {
    const { id } = useParams({ from: '/$id/edit' });
    return <h1>Blog Edit Page {id}</h1>;
  },
});

const routeTree = rootRoute.addChildren([blogRoute, blogEditRoute]);

const router = new ReactRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
