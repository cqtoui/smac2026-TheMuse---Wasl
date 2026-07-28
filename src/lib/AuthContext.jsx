import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "@/api/supabaseClient";
import { waslApi } from "@/api/waslClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  const checkUserAuth = useCallback(async () => {
    setIsLoadingAuth(true);

    try {
      const currentUser = await waslApi.auth.me();

      setUser(currentUser);
      setAuthError(null);

      return currentUser;
    } catch (error) {
      console.error("Authentication check failed:", error);

      setUser(null);
      setAuthError({
        type: "authentication_error",
        message:
          error?.message ||
          "Unable to verify your account.",
      });

      return null;
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initializeAuthentication() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (error) {
          throw error;
        }

        if (!session?.user) {
          setUser(null);
          setAuthError(null);
          return;
        }

        const currentUser = await waslApi.auth.me();

        if (!isMounted) {
          return;
        }

        setUser(currentUser);
        setAuthError(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error(
          "Unable to initialize authentication:",
          error
        );

        setUser(null);
        setAuthError({
          type: "authentication_error",
          message:
            error?.message ||
            "Unable to initialize authentication.",
        });
      } finally {
        if (isMounted) {
          setIsLoadingAuth(false);
          setAuthChecked(true);
        }
      }
    }

    initializeAuthentication();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) {
          return;
        }

        if (!session?.user) {
          setUser(null);
          setAuthError(null);
          setIsLoadingAuth(false);
          setAuthChecked(true);
          return;
        }

        try {
          const currentUser = await waslApi.auth.me();

          if (!isMounted) {
            return;
          }

          setUser(currentUser);
          setAuthError(null);
        } catch (error) {
          if (!isMounted) {
            return;
          }

          console.error(
            `Authentication event ${event} failed:`,
            error
          );

          setUser(null);
          setAuthError({
            type: "authentication_error",
            message:
              error?.message ||
              "Unable to load the authenticated user.",
          });
        } finally {
          if (isMounted) {
            setIsLoadingAuth(false);
            setAuthChecked(true);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const logout = useCallback(async (shouldRedirect = true) => {
    setIsLoadingAuth(true);

    try {
      await waslApi.auth.logout();

      setUser(null);
      setAuthError(null);

      if (shouldRedirect) {
        window.location.assign("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);

      setAuthError({
        type: "logout_error",
        message: error?.message || "Unable to sign out.",
      });
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  const navigateToLogin = useCallback(() => {
    window.location.assign("/login");
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authChecked,
      authError,

      appPublicSettings: {
        id: "wasl",
        public_settings: {},
      },

      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState: checkUserAuth,
    }),
    [
      user,
      isLoadingAuth,
      authChecked,
      authError,
      logout,
      navigateToLogin,
      checkUserAuth,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}