import {useRoutes, useLocation, useNavigate} from "react-router-dom"
import {useEffect} from "react"
import router from "./router"

function ToLogin(){
  const to = useNavigate()
  useEffect(()=>{
    to("/login")
  },[])
  return <div></div>
}

function Enterrouter(){
  const outlet = useRoutes(router)
  const location = useLocation()
  let token = localStorage.getItem("token")
  if(location.pathname!=="/login" && location.pathname!=="/register" && !token)
  {
    return <ToLogin />
  }
  return outlet
}

function App() {
  return (
    <div className="container">
      <Enterrouter />
    </div>
  )
}

export default App
