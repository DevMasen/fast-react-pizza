# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Getting Start with new React Router Data mode:

### 1. Create BrowserRouter and RouterProvider and add loader

```js
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Route1 ,{loader as Route1loader} from './components/Route1';
import Route2 from './components/Route2';
import Route3 from './components/Route3';
import Home from './components/Home';

const router = createBrowserRouter([
	{
		element: <RootRoute/>
		children:[
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/route1',
				element: <Route1 />,
				loader: Route1loader,
			},
			{
				path: '/route2/nested',
				element: <Route2 /> },
			{
				path: '/route2/:id',
				element: <Route3 />,
			},
		]
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
```

## Note: To render children routes in `<RootRoute/>` we should use `<Outlet/>` component in it.

### 2. Create loader function and use data in component

```js
import { useLoaderData } from 'react-router';
import { getData } from 'api';

export default function Component() {
	const data = useLoaderData();

	return <div>{data.key}</div>;
}
export async function loader() {
	const data = await getData();
	return data;
}
```

### 3. Use the hook `useNavigation()` to get the loading state of route.
