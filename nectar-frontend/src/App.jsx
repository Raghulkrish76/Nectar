import { BrowserRouter, Route, Routes } from "react-router"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { HomePage } from "./pages/HomePage"
import { PlantDetailPage } from "./pages/PlantDetailPage"
import { CreatePlant } from "./components/CreatePlantForm"
import { Bookmarks } from "./pages/Bookmarks"
import { AboutPage } from "./pages/AboutPage"
import { AdminDashboard } from "./pages/AdminDashboard"
import { UserProfile } from "./pages/UserProfile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/aboutus/" element={<AboutPage />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />

        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>}
        />
        <Route path="/plants/create/" element={
          <ProtectedRoute>
            <CreatePlant />
          </ProtectedRoute>}
        />
        <Route path="/plants/:id" element={
          <ProtectedRoute>
            <PlantDetailPage />
          </ProtectedRoute>}
        />

        <Route path="/bookmarks/" element={
          <ProtectedRoute>
            <Bookmarks />
          </ProtectedRoute>}
        />
        <Route path="/admin-dashboard/" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>}
        />
        <Route path="/user-profile/" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App