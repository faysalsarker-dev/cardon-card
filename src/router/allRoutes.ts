import HomePage from "@/pages/home/HomePage";
import HowItWork from "@/pages/howItWork/HowItWork";

const routes = [

  {
    Component: HomePage,
    path: "/",
    name: "Home",
  },
  {
    Component: HowItWork,
    path: "/how-it-work",
    name: "howItWorks",
  },


]



export default routes; 