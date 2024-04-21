import React,{ lazy } from "react"
import Home from "../views/Home"
import Login from "../views/Login"
import Register from "../views/register/index"

const HomePage = lazy(()=>import("../views/user/UserPage"))
const Layout = lazy(()=>import("../views/place/place"))
const Look = lazy(()=>import("../views/look/Look"))
const Map = lazy(()=>import("../views/map/Map"))
const Data = lazy(()=>import("../views/data/data"))
const Picture = lazy(()=>import("../views/picture/picture"))

import {Navigate} from "react-router-dom"

const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const routes = [
    {
        path:"/",
        element: <Navigate to='/login'/>
    },
    {
        path:"/",
        element: <Home />,
        children:[
            {
                path:"/HomePage",
                element: withLoadingComponent(<HomePage />)
            },
            {
                path:"/Data",
                element: withLoadingComponent(<Data />)
            },
            {
                path:"/Layout",
                element: withLoadingComponent(<Layout />)
            },
            {
                path:"/Look",
                element: withLoadingComponent(<Look />)
            },
            {
                path:"/Map",
                element: withLoadingComponent(<Map />)
            },
            {
                path:"/Picture",
                element: withLoadingComponent(<Picture />)
            },         
        ]
    },
    {
        path:"/login",
        element: <Login />
    },
    {
        path:"/register",
        element: <Register />
    },
    {
        path: "*",
        element: <Login />
    },
]

export default routes