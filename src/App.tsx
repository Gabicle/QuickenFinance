import { RouterProvider } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import { router } from './router';




function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
