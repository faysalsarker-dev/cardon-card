import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

import { Outlet, ScrollRestoration } from "react-router";

export default function MainLayout() {
  return (
  <div >
     <Navbar />


      <div className="bg-background text-primary min-h-screen overflow-hidden">
      <Outlet/>
      <ScrollRestoration/>
      </div>
       <Footer />
  </div>
  )
}