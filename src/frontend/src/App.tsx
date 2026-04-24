import { Toaster } from "@/components/ui/sonner";
import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy page imports
const HomePage = lazy(() => import("./pages/HomePage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminArticleForm = lazy(() => import("./pages/AdminArticleForm"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const MembresPage = lazy(() => import("./pages/MembresPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogListPage,
});

const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: BlogDetailPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  ),
});

const adminNewArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/articles/new",
  component: () => (
    <ProtectedRoute>
      <AdminArticleForm />
    </ProtectedRoute>
  ),
});

const adminEditArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/articles/$id/edit",
  component: () => (
    <ProtectedRoute>
      <AdminArticleForm />
    </ProtectedRoute>
  ),
});

const galerieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/galerie",
  component: GalleryPage,
});

const membresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/membres",
  component: MembresPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute,
  blogDetailRoute,
  adminRoute,
  adminNewArticleRoute,
  adminEditArticleRoute,
  galerieRoute,
  membresRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <InternetIdentityProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </InternetIdentityProvider>
  );
}
