import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("backlog", "routes/backlog.tsx"),
  route("backlog/new", "routes/backlog.new.tsx"),
  route("backlog/:id", "routes/backlog.$id.tsx"),

  route("api/backlog", "routes/api.backlog.ts"),
  route("api/backlog/:id", "routes/api.backlog.$id.ts"),
] satisfies RouteConfig;
