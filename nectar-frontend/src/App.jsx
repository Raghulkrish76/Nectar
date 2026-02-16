import { BrowserRouter,Route,Routes } from "react-router"
import { Userpage} from "./pages/UserPage"
import { AdminPage } from "./pages/AdminPage"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    
    <Route path = "/" element = {
      <ProtectedRoute>
        <Userpage/>
      </ProtectedRoute> }/>
    <Route  path = "/login/" element = {<Login/>}/>
    <Route  path = "/register/" element = {<Register/>}/>
   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
