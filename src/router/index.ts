import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router";
import routes from "./allRoutes";
import OrderPage from "@/pages/order/OrderPage";


export const router = createBrowserRouter([

  {
      Component: MainLayout,
            path: '/',
            // errorElement: <NotFoundPage />,
            children:[
                ...routes
            ]
      





  
},
 {
    Component: OrderPage,
    path: "/order",
  },



]);