import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

function navLinkStyles({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return "rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700";
  }
  return "rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";
}

export function Layout({ children }: { children: ReactNode }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
            <Link to="/" className="text-lg font-bold text-slate-900">
              Agile Sim
            </Link>
            <nav aria-label="Main">
              <ul className="flex gap-1">
                <li>
                  <NavLink to="/" end className={navLinkStyles}>
                    Game
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/backlog" className={navLinkStyles}>
                    Backlog
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="relative mx-auto max-w-6xl p-4 sm:p-6">
          <div
            aria-busy={isLoading}
            className={
              isLoading
                ? "pointer-events-none opacity-60 blur-[2px] transition delay-250 duration-200"
                : "transition duration-150"
            }
          >
            {children}
          </div>
          <div
            role="status"
            className={
              isLoading
                ? "absolute inset-x-0 top-24 flex justify-center opacity-100 transition-opacity delay-250 duration-150"
                : "absolute inset-x-0 top-24 flex justify-center opacity-0"
            }
          >
            {isLoading && (
              <span className="flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-lg ring-1 ring-slate-200">
                <span
                  aria-hidden="true"
                  className="size-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"
                />
                Loading…
              </span>
            )}
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Something went wrong";
  let details = "An unexpected error occurred. Please try again.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Not found";
    } else {
      title = `Error ${error.status}`;
    }
    if (typeof error.data === "string") {
      details = error.data;
    }
  }

  return (
    <section
      role="alert"
      className="mx-auto max-w-lg rounded-xl border border-rose-200 bg-white p-6 text-center shadow-sm"
    >
      <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">{details}</p>
      <Link
        to="/backlog"
        className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Back to backlog
      </Link>
    </section>
  );
}
