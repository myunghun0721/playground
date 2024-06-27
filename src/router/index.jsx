import { createBrowserRouter } from 'react-router-dom';
import Experience from '../components/Laptop';
import Homepage from '../components/Homepage/Homepage';
import Physics from '../components/Physics';



export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Homepage/>,
      },
      {
        path: "/laptop",
        element: <Experience />,
      },
      {
        path: "/physics",
        element: <Physics />,
      },
      {
        path: "/*",
        element: <h1>Feature coming soon!</h1>,
        // element: <FooterPage/>,
      },
    ],
  },
]);
