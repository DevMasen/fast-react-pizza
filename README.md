# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Getting Start with new React Router syntax:

```js
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{ path: '/route1', element: <Route1 /> },
	{ path: '/route2/nested', element: <Route2 /> },
	{
		path: '/route2/:id',
		element: <Route3 />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}
```
