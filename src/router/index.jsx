import { createBrowserRouter } from 'react-router-dom';
import Experience from '../components/Laptop';
import Homepage from '../components/Homepage/Homepage';
import Physics from '../components/Physics';
import Game from '../components/Game';
import Remaster from '../components/Remaster/Remaster';



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
        path: "/game",
        element: <Game/>
      },
      {
        path: "/test",
        element: <Remaster/>
      },
      {
        path: "/*",
        element: <h1>404 page not found</h1>,
        // element: <FooterPage/>,
      },
    ],
  },
]);
