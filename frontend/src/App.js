import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.scss';

// Home imports
import HomeNavbar from './components/home/HomeNavbar';
import HomePage from './components/home/HomePage';
import Login from './components/home/Login';
import CreateAccount from './components/home/CreateAccount';

// User imports
import UserNavbar from './components/user/UserNavbar';


const router = createBrowserRouter([
    // /
    {
        path: '',
        element: <HomeNavbar />,
        children: [
            // / default
            {
                index: true,
                element: <Navigate to='home' />,
            },
            // /home
            {
                path: 'home',
                element: <HomePage />,
            },
            // /about
            {
                path: 'about',
                element: <div>about</div>,
            },
            // /blog
            {
                path: 'blog',
                element: <div>blog</div>,
            },
            // /login
            {
                path: 'login',
                element: <Login />,
            },
            // /create-account
            {
                path: 'create-account',
                element: <CreateAccount />,
            },
        ],
    },
    // /user
    {
        path: 'user',
        element: <UserNavbar />,
        children: [
            // /user default
            {
                index: true,
                element: <Navigate to='pdsa' />,
            },
            // /user/pdsa
            {
                path: 'pdsa',
                element: (
                    <div>
                        <p className='vh-100 d-flex'>pdsa</p>
                        <p className='vh-100 d-flex'>pdsa</p>
                    </div>
                    ),
            },
            // /user/pdsa
            {
                path: 'driver',
                element: <div>driver</div>,
            },
            // /user/pdsa
            {
                path: 'team',
                element: <div>team</div>,
            },
            // /user/pdsa
            {
                path: 'logout',
                element: <div>logout</div>,
            },
        ]
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
