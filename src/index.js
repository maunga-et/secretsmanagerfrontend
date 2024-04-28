import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider} from "./context/AuthProvider";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);

