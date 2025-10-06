import { RouterProvider } from "react-router-dom"
import { router } from './router';
import { MockBadge } from "./components/dev/MockBadge";




function App() {
  return (
    <>
      <RouterProvider router={router} />
      <MockBadge />
    </>

  )
}

export default App
