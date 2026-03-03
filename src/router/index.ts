import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router";
import routes from "./allRoutes";


export const router = createBrowserRouter([

  {
      Component: MainLayout,
            path: '/',
            // errorElement: <NotFoundPage />,
            children:[
                ...routes
            ]
      





  
}]);