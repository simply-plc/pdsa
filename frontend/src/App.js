import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.scss';

import HomeNavbar from './components/home/HomeNavbar';

const router = createBrowserRouter([
    {
        path: '/home',
        element: <HomeNavbar />,
        children: [],
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
