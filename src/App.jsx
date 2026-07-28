import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

import Splash from "@/pages/Splash";
import Welcome from "@/pages/Welcome";
import Home from "@/pages/Home";
import NewConversation from "@/pages/NewConversation";
import Participants from "@/pages/Participants";
import SessionCreated from "@/pages/SessionCreated";

import { SettingsProvider } from "@/lib/SettingsContext";
import SettingsApplier from "@/components/wasl/SettingsApplier";

const AuthenticatedApp = () => {
  const {
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    navigateToLogin,
  } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-wasl-soft border-t-wasl-primary" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    }

    if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  return (
    <SettingsProvider>
      <SettingsApplier />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route
          element={
            <ProtectedRoute
              unauthenticatedElement={<Navigate to="/login" replace />}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/conversation/new" element={<NewConversation />} />
          <Route
            path="/conversation/:id/participants"
            element={<Participants />}
          />
          <Route
            path="/conversation/:id/session"
            element={<SessionCreated />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </SettingsProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
