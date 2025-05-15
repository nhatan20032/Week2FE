import HomePage from "../home/home";
import AboutPage from "../home/about";
import ContactPage from "../home/contact";
import DefaultPage from "../home/default";

export interface RouteItem {
  path: string;
  exact: boolean;
  component: React.ComponentType;
}

const routes: RouteItem[] = [
  {
    path: "/default-page",
    exact: true,
    component: DefaultPage,
  },
  {
    path: "/home",
    exact: false,
    component: HomePage,
  },
  {
    path: "/about",
    exact: false,
    component: AboutPage,
  },
  {
    path: "/contact",
    exact: false,
    component: ContactPage,
  },
];

export default routes;
