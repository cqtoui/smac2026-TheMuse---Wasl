
import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LogIn,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { waslApi } from "@/api/waslClient";
import { useAuth } from "@/lib/AuthContext";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import FacebookIcon from "@/components/FacebookIcon";
import LanguageSelector from "@/components/wasl/LanguageSelector";

import {
  useT,
} from "@/i18n";

export default function Login() {
  const { t } = useT();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    user,
    isLoadingAuth,
  } = useAuth();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    providerLoading,
    setProviderLoading,
  ] = useState("");

  useEffect(() => {
    const query =
      new URLSearchParams(
        location.search
      );

    if (
      query.get("confirmed") ===
      "true"
    ) {
      setMessage(
        "Your email has been confirmed. You can now sign in."
      );
    }

    if (
      query.get("error")
    ) {
      setError(
        "Authentication could not be completed. Please try again."
      );
    }
  }, [location.search]);

  useEffect(() => {
    if (
      !isLoadingAuth &&
      user
    ) {
      navigate("/", {
        replace: true,
      });
    }
  }, [
    user,
    isLoadingAuth,
    navigate,
  ]);

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");
      setMessage("");
      setLoading(true);

      try {
        await waslApi.auth.loginViaEmailPassword(
          email,
          password
        );

        navigate("/", {
          replace: true,
        });
      } catch (error) {
        console.error(
          "Login failed:",
          error
        );

        let errorMessage =
          error?.message ||
          t("login.error") ||
          "Unable to sign in.";

        if (
          errorMessage
            .toLowerCase()
            .includes(
              "email not confirmed"
            )
        ) {
          errorMessage =
            "Please confirm your email address before logging in.";
        }

        if (
          errorMessage
            .toLowerCase()
            .includes(
              "invalid login"
            )
        ) {
          errorMessage =
            "Incorrect email address or password.";
        }

        setError(
          errorMessage
        );
      } finally {
        setLoading(false);
      }
    };

  const handleProviderLogin =
    async (provider) => {
      setError("");
      setMessage("");

      setProviderLoading(
        provider
      );

      try {
        await waslApi.auth.loginWithProvider(
          provider,
          "/"
        );
      } catch (error) {
        console.error(
          `${provider} login failed:`,
          error
        );

        setError(
          error?.message ||
            `Unable to continue with ${provider}.`
        );

        setProviderLoading("");
      }
    };

  return (
    <AuthLayout
      icon={LogIn}
      title={t("login.title")}
      subtitle={t(
        "login.subtitle"
      )}
      footer={
        <>
          {t(
            "login.noAccount"
          )}{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            {t(
              "login.createOne"
            )}
          </Link>
        </>
      }
    >
      <div className="mb-6 space-y-3">
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full text-sm font-medium"
          disabled={
            Boolean(
              providerLoading
            ) || loading
          }
          onClick={() =>
            handleProviderLogin(
              "google"
            )
          }
        >
          {providerLoading ===
          "google" ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <GoogleIcon className="mr-2 h-5 w-5" />
          )}

          {t('login.google')}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-12 w-full text-sm font-medium"
          disabled={
            Boolean(
              providerLoading
            ) || loading
          }
          onClick={() =>
            handleProviderLogin(
              "facebook"
            )
          }
        >
          {providerLoading ===
          "facebook" ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <FacebookIcon className="mr-2 h-5 w-5" />
          )}

          {t('login.facebook')}
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">
            {t("login.or")}
          </span>
        </div>
      </div>

      {message && (
        <div
          role="status"
          className="mb-4 flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

          <span>
            {message}
          </span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">
            {t("login.email")}
          </Label>

          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />

            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onChange={(
                event
              ) =>
                setEmail(
                  event.target
                    .value
                )
              }
              className="h-12 pl-10"
              disabled={
                loading
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">
              {t(
                "login.password"
              )}
            </Label>

            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              {t(
                "login.forgot"
              )}
            </Link>
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />

            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={
                password
              }
              onChange={(
                event
              ) =>
                setPassword(
                  event.target
                    .value
                )
              }
              className="h-12 pl-10"
              disabled={
                loading
              }
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="h-12 w-full font-medium"
          disabled={
            loading ||
            Boolean(
              providerLoading
            )
          }
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              Signing in...
            </>
          ) : (
            t(
              "login.submit"
            )
          )}
        </Button>
      </form>

      <div className="mt-6">
        <LanguageSelector
          inline
        />
      </div>
    </AuthLayout>
  );
}