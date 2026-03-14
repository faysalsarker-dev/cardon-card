import HomePage from "@/pages/home/HomePage";
import HowItWork from "@/pages/howItWork/HowItWork";
import Contact from "@/pages/contact/Contact";
import Faq from "@/pages/faq/Faq";
import BestSellers from "@/pages/bestSellers/BestSellers";

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
  {
    Component: Contact,
    path: "/support",
    name: "contact",
  },
  {
    Component: Faq,
    path: "/faq",
    name: "faq",
  },
  {
    Component: BestSellers,
    path: "/best-sellers",
    name: "bestSellers",
  },
];

export default routes;