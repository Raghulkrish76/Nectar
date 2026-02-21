import { BrowserRouter,Route,Routes } from "react-router"
import { Userpage} from "./pages/UserPage"
import { AdminPage } from "./pages/AdminPage"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { ProtectedRoute } from "./components/ProtectedRoute"
import {HomePage} from  "./pages/HomePage"
import { PlantDetailPage } from "./pages/PlantDetailPage"
import { CreatePlant } from "./components/CreatePlantForm"

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    
    <Route path = "/" element = {
      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute> }/>
    <Route path = "/plants/:id" element = {
      <ProtectedRoute>
        <PlantDetailPage/>
      </ProtectedRoute> }/>
    <Route  path = "/login/" element = {<Login/>}/>
    <Route  path = "/register/" element = {<Register/>}/>
    <Route  path = "/plants/create/" element = {<CreatePlant/>}/>
    
   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
