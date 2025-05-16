import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
export default [
  index("routes/home.tsx"),
  layout("routes/about.tsx", [
    ...prefix("about", [index("routes/abouts/home.tsx")]),
  ]),
  layout("routes/product.tsx", [
    ...prefix("product", [
      index("routes/products/home.tsx"),
      route(":productId", "routes/products/info.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
