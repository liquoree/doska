import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./AuthPage.scss";

type AuthMode = "login" | "register";

function normalizeMode(value: string | null): AuthMode {
  return value === "register" ? "register" : "login";
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const mode = useMemo(() => normalizeMode(params.get("mode")), [params]);
  const from = params.get("from") ?? "/projects";

  const setMode = (next: AuthMode) => {
    const nextParams = new URLSearchParams(params);
    nextParams.set("mode", next);
    setParams(nextParams, { replace: true });
  };

  const onSuccess = () => {
      navigate(from, { replace: true })
  }

  return (
    <div className="auth-page-wrapper">
        <div className="auth-page-container">
        <h1>доска.</h1>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button
            type="button"
            onClick={() => setMode("login")}
            disabled={mode === "login"}
            className="auth-btn login-btn"
            >
            Войти
            </button>
            <button
            type="button"
            onClick={() => setMode("register")}
            disabled={mode === "register"}
            className="auth-btn register-btn"
            >
            Регистрация
            </button>
        </div>

        {/* key заставляет перемонтировать форму при смене режима */}
        {mode === "login" ? (
            <LoginForm key="login" onSuccess={onSuccess} />
        ) : (
            <RegisterForm key="register" onSuccess={onSuccess} />
        )}
        </div>
    </div>
    
  );
}