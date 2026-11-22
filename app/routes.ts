import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("api/backlog", "routes/api.backlog.ts"),
  route("api/backlog/:id", "routes/api.backlog.$id.ts"),
] satisfies RouteConfig;
