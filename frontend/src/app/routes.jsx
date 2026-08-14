import {createBrowserRouter, Navigate} from 'react-router-dom'

import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import DashboardPage from '../features/tourist/pages/DashboardPage'
import AuthLayout from '../layouts/AuthLayout'
import ProtectedRoutes from '../components/auth/ProtectedRoutes'

const router = createBrowserRouter([
    {
        path:'/',
        element:<Navigate to='/login' replace />
    },
    {
        element:<AuthLayout/>,
        children:[
            {
                path:'/login',
                element:<LoginPage/>
            },
            {
                path:'/register',
                element:<RegisterPage/>
            },
        ]   
    },
    {
        element:<ProtectedRoutes/>,
        children:[
            {
                path: "/dashboard",
                element: <DashboardPage />
            }
        ]
    }
])

export default router