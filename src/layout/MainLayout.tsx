import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

import { Outlet } from "react-router";

export default function MainLayout() {
  return (
  <div >
     <Navbar />


      <div className="bg-background text-primary min-h-screen overflow-hidden">
      <Outlet/>
      </div>
       <Footer />
  </div>
  )
}