# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Getting Start with React Router Data mode:

## 1. Create BrowserRouter and RouterProvider and add loader and action.

```js
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Route1, { loader as Route1Loader } from './components/Route1';
import Route2, { action as Route2Action } from './components/Route2';
import Route3 from './components/Route3';
import Home from './components/Home';
import Error from './components/Error';

const router = createBrowserRouter([
  {
    element: <RootRoute />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/route1',
        element: <Route1 />,
        loader: Route1Loader,
        errorElement: <Error />,
      },
      {
        path: '/route2/nested',
        element: <Route2 />,
        action: Route2Action,
      },
      {
        path: '/route2/:id',
        element: <Route3 />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

## Note: To render children routes in `<RootRoute/>` we should use `<Outlet/>` component in it.

## 2. Create loader function and use data in component

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

## 3. Use the hook `useNavigation()` to get the loading state of Route.

## 4. Handle Errors with errorElement attribue in createBrowserRoute and `useRouteError()` hook.

## 5. Sending a POST request to the API with react router:

### 1. Create a react router Form element and action function:

```js
import { postData } from 'api';
import { Form, redirect, useActionData, useNavigation } from 'react-router';

export default function Component() {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form method="POST">
      <input type="X" name="y" />
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};
  if (ERROR1_CONDITION) {
    errors.ERROR1 = 'ERROR MESSAGE!';
    return errors;
  }
  if (ERROR2_CONDITION) {
    errors.ERROR2 = 'ERROR MESSAGE!';
    return errors;
  }

  const res = await postData(data);

  return redirect(`/route/${res.id}`);
}
```

### 2. Connect the action to the routeCreator.

# Getting Start with Tailwind CSS:

## 1. Installation : See Tailwind [Docs](https://v3.tailwindcss.com/docs/guides/vite)

```cmd
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### A. Update `tailwind.config.js` :

```js
/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

### B. Add This Lines in `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 2. Setup Prettier for Tailwind : See Tailwind [Docs](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

```cmd
npm install -D prettier prettier-plugin-tailwindcss
```

### Add this codes to `prettier.config.js` :

```js
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
};
export default config;
```

## 3. Install Tailwind VSCode extension

## 4. run: `npm run dev` and enjoy Tailwind 😉

# Getting Start with Redux Advanced Thunk:

## 1. Create a Async Thunk and connent it to the Slice: `featureSlice.js`:

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchAction = createAsyncThunk('feature/fetchAction', async function () {
  // Asynchronous Codes (await codes)
  return data;
});

const initialState = {
  status: 'idle',
  data: [],
  error: '',
};

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    action1(state, action) {
      // Updating States
    },
  },
  extraReducers: (bulder) =>
    builder
      .addCase(fetchAction.pending, (state, action) => {
        // Pending Status : Update States
        state.status = 'loading';
      })
      .addCase(fetchAction.fulfilled, (state, action) => {
        // Fulfilled Status : Update States
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchAction.rejected, (state, action) => {
        // Error Status : Update States
        state.error = action.error.message;
        state.status = 'error';
      }),
});

export const { action1 } = featureSlice.actions;

export default featureSlice.reducer;

// Selector functions
export const getData = (store) => store.feature.data;
```

## 2. Using an Action Creator in another Action Creator:

```js
const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    action1(state, action) {
      // Updating States
    },
    action2(state, action) {
      // Updating States with action 1
      featureSlice.caseReducers.action1(state, action);
    },
  },
});
```
