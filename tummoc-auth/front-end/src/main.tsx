import React from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register  from './routes/Register.tsx'
import Login from './routes/Login.tsx';
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.ts'
import Redirect from './routes/Redirect.tsx';
import Home from './routes/Home.tsx';
import NotFound from './routes/NotFound.tsx';

 const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
  button:
    ' bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
  errorMsg: 'text-red-500 text-sm',
  form: 'w-full sm:w-[400px] m-7 sm:m-0',
  title: 'text-center font-bold',
  error: ' text-sm text-red-700'
}

const router = createBrowserRouter([
  
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <Home />,
  },
    {
      path: '/login',
      element: <Login styles={styles}/>,
    },
    {
      path: '/register',
      element: <Register styles={styles}/>,
    },
    {
      path: '/OAuthRedirecting',
      element: <Redirect />,
    }

]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
