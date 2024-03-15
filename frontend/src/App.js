import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.scss';

// Home imports
import HomeNavbar from './components/home/HomeNavbar';
import HomePage from './components/home/HomePage';
import Login from './components/home/Login';
import CreateAccount from './components/home/CreateAccount';

// User team
import UserNavbar from './components/user/UserNavbar';
import TeamsPage from './components/user/TeamsPage';
import OverviewPage from './components/user/OverviewPage';
import ChangeIdeasPage from './components/user/ChangeIdeasPage';
import SettingsPage from './components/user/SettingsPage';
import UserTeam from './components/team/UserTeam';

// User change idea
import UserChangeIdea from './components/change-idea/UserChangeIdea'


const router = createBrowserRouter([
    // /
    {
        path: '',
        element: <HomePage />,
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
                element: <OverviewPage />,
            },
            // /user/pdsa
            {
                path: 'change-ideas',
                element: <ChangeIdeasPage />,
            },
            {
                path: 'change-ideas/:changeIdeaId',
                element: <UserChangeIdea />,
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
                element: <SettingsPage />,
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
