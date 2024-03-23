import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import "bootstrap-icons/font/bootstrap-icons.css";
// import './App.scss';

// Home imports
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/landing-page/Login';
import CreateAccount from './components/landing-page/CreateAccount';

// User
import ChooseTeam from './components/user/ChooseTeam';
import UserPage from './components/user/UserPage';
// import UserNavbar from './components/user/UserNavbar';
// import TeamsPage from './components/user/TeamsPage';
// import OverviewPage from './components/user/OverviewPage';
// import ChangeIdeasPage from './components/user/ChangeIdeasPage';
// import SettingsPage from './components/user/SettingsPage';
// import UserTeam from './components/team/UserTeam';

// Team
import Insights from './components/team/Insights';

// User change idea
// import UserChangeIdea from './components/change-idea/UserChangeIdea'


const router = createBrowserRouter([
    // /
    {
        path: '/',
        element: <LandingPage />,
        children: [
            // // / default
            // {
            //     index: true,
            //     element: <Navigate to='home' />,
            // },
            // // /home
            // {
            //     path: 'home',
            //     element: <LandingPage />,
            // },
            // // /about
            // {
            //     path: 'about',
            //     element: <div>about</div>,
            // },
            // // /blog
            // {
            //     path: 'blog',
            //     element: <div>blog</div>,
            // },
            // // /login
            // {
            //     path: 'login',
            //     element: <Login />,
            // },
            // // /create-account
            // {
            //     path: 'create-account',
            //     element: <CreateAccount />,
            // },
        ],
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'create-account',
        element: <CreateAccount />,
    },
    // /0
    {
        path: '0',
        element: <UserPage />,
        children: [
        {
            index: true,
            element: <Navigate to='home' />,
        },
        // /0/home
        {
            path: 'home',
            element: <div>home</div>,
        },
        // /0/tasks
        {
            path: 'tasks',
            element: <div>tasks</div>,
        },
        // /0/plans
        {
            path: 'plans',
            element: <div>plans</div>,
        },
        // /0/team-id
        {
            path: ':id',
            children: [
                {
                    path:'insights',
                    element:<Insights />,
                },
            ]
        },
        // /0/choose-team
        {
            path: 'choose-team',
            element: <ChooseTeam />,
        },
        ]
    },

    // /user
    // {
    //     path: 'user',
    //     element: <UserNavbar />,
    //     children: [
    //         // /user default
    //         {
    //             index: true,
    //             element: <Navigate to='overview' />,
    //         },
    //         // /user/overview
    //         {
    //             path: 'overview',
    //             element: <OverviewPage />,
    //         },
    //         // /user/pdsa
    //         {
    //             path: 'change-ideas',
    //             element: <ChangeIdeasPage />,
    //         },
    //         {
    //             path: 'change-ideas/:changeIdeaId',
    //             element: <UserChangeIdea />,
    //         },
    //         // /user/teams
    //         {
    //             path: 'teams',
    //             element: <TeamsPage />,
    //         },
    //         // /user/teams/<int:pk>
    //         {
    //             path: 'teams/:teamId',
    //             element: <UserTeam />,
    //         },
    //         // /user/settings
    //         {
    //             path: 'settings',
    //             element: <SettingsPage />,
    //         },
    //     ]
    // },
]);

function App() {
    let theme = createTheme({
        palette: {
            primary: {
                main: '#20c997',
            },
            secondary: {
                main: '#c92053',
            },
        },
        typography: {
            fontFamily: "'Nunito', sans-serif"
        },
    });

    theme = createTheme(theme, {
        palette: {
            custom1: theme.palette.augmentColor({
                color: {
                    main: '#1D3354',
                },
                name: 'delft blue',
            }),
            custom2: theme.palette.augmentColor({
                color:{
                    main:'#424651'
                },
                name: 'carribean current',
            })
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
