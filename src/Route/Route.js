import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import Registration from '../Pages/Registration/Registration';
import Login from '../Pages/Login/Login';
import Instructors from '../Pages/Instructors/Instructors';
import Dashboard from '../Layout/Dashboards/Dashboard';
import AddClasses from '../Pages/Dashboard/AddClass/AddClasses';
import UserDashboard from '../Pages/Dashboard/UserDashboard/UserDashboard';
import Classes from '../Pages/Classes/Classes';
import MyClass from '../Pages/Dashboard/MyClass/MyClasses';
import UpdateClass from '../Pages/Dashboard/UpdateClass/UpdateClass';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import ManageClasses from '../Pages/Dashboard/ManageClasses/ManageClasses';
import Deny from '../Pages/Dashboard/ManageClasses/Deny';
import ManageUsers from '../Pages/Dashboard/ManageUsers/ManageUsers';
import MySelectedClasses from '../Pages/Dashboard/MySelectedClasses/MySelectedClasses';
import MyEnrolledClasses from '../Pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';
import Error from '../Pages/ErrorPage/Error';
import Feedback from '../Pages/Dashboard/ManageClasses/Feedback';


const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        errorElement:<Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            }
            ,
            {
                path: '/login',
                element: <Login></Login>
            }
            ,
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            }
            ,
            {
                path: '/classes',
                element: <Classes></Classes>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'userDashboard',
                element: <UserDashboard></UserDashboard>
            },
            {
                path: 'addClasses',
                element: <PrivateRoute><AddClasses></AddClasses></PrivateRoute>
            },
            {
                path: 'myClasses',
                element: <PrivateRoute><MyClass></MyClass></PrivateRoute>
            }
            ,
            {
                path: 'updateClass/:id',
                loader: ({ params }) =>
                    fetch(`https://assignment-12-server-iota-two.vercel.app/myClass/${params.id}`),
                element: <PrivateRoute><UpdateClass></UpdateClass></PrivateRoute>
            }
            ,
            {
                path: 'manageClasses',
                element: <PrivateRoute><ManageClasses></ManageClasses></PrivateRoute>
            }
            ,
            {
                path: 'deny/:id',
                element: <PrivateRoute><Deny></Deny></PrivateRoute>
            }
            ,
            {
                path: 'feedback/:id',
                element: <PrivateRoute><Feedback></Feedback></PrivateRoute>
            }
            ,
            {
                path: 'manageUsers',

                element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
            }
            ,
            {
                path: 'myAddedClasses',

                element: <PrivateRoute><MySelectedClasses></MySelectedClasses></PrivateRoute>
            }
            ,
            {
                path: 'myEnrolledClasses',

                element: <PrivateRoute><MyEnrolledClasses></MyEnrolledClasses></PrivateRoute>
            }
            ,
            {
                path: 'payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            }
            ,
            {
                path: 'paymentHistory',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            }
        ]
    }
])


export default router;