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
import DriverPage from './components/user/DriverPage';
import TeamsPage from './components/user/TeamsPage';

// Team imports
import UserTeam from './components/team/UserTeam';


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
                element: <Navigate to='overview' />,
            },
            // /user/overview
            {
                path: 'overview',
                element: <div>overview</div>,
            },
            // /user/pdsa
            {
                path: 'change-ideas',
                element: (
                    <div>
                        <p className='vh-100 d-flex'>pdsa</p>
                        <p className='vh-100 d-flex'>pdsa</p>
                    </div>
                    ),
            },
            // /user/drivers
            {
                path: 'drivers',
                element: <DriverPage />,
            },
            // /user/teams
            {
                path: 'teams',
                element: <TeamsPage />,
            },
            // /user/teams/<int:pk>
            {
                path: 'teams/:teamId',
                element: <UserTeam />,
            },
            // /user/settings
            {
                path: 'settings',
                element: <div>settings</div>,
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
