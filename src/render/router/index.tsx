import { createBrowserRouter } from "react-router-dom"
import Demo from '../pages/demo'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Demo />,
  },
])

export default router
