import HomePage from "@/pages/home/HomePage";
import HowItWork from "@/pages/howItWork/HowItWork";
import Contact from "@/pages/contact/Contact";
import DesignMyOwn from "@/pages/design/DesignMyOwn";

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
    Component: DesignMyOwn,
    path: "/design-your-own",
    name: "designYourOwn",
  },
  {
    Component: DesignMyOwn,
    path: "/order",
    name: "designYourOwnOrder",
  },
];

export default routes;