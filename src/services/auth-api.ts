import type { AuthUser } from "@/store/useAuthStore";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// ─── Mocked API calls ─────────────────────────────────────────────────────────
// Replace the mock body with a real fetch() call when the backend is ready.

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  await delay(800);

  // Simulate wrong-password error (uncomment to test error state)
  // throw new Error("Invalid credentials. Please check your email and password.");

  const user: AuthUser = {
    firstName: "Demo",
    lastName: "User",
    phone: "+201234567890",
  };
  const token = "mock-jwt-token-" + Date.now();

  return { user, token };

  // ── Real API (future) ──────────────────────────────────────────────────────
  // const res = await fetch("/api/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error((await res.json()).message ?? "Login failed");
  // return res.json();
}

export async function signupApi(payload: SignupPayload): Promise<AuthResponse> {
  await delay(800);

  const user: AuthUser = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    phone: payload.phone,
  };
  const token = "mock-jwt-token-" + Date.now();

  return { user, token };

  // ── Real API (future) ──────────────────────────────────────────────────────
  // const res = await fetch("/api/auth/signup", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error((await res.json()).message ?? "Signup failed");
  // return res.json();
}

export async function forgotPasswordApi(phone: string): Promise<{ message: string }> {
  await delay(800);

  return { message: "A verification code has been sent to your phone." };

  // ── Real API (future) ──────────────────────────────────────────────────────
  // const res = await fetch("/api/auth/forgot-password", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ phone }),
  // });
  // if (!res.ok) throw new Error((await res.json()).message ?? "Request failed");
  // return res.json();
}

export async function resetPasswordApi(newPassword: string): Promise<{ message: string }> {
  await delay(800);

  return { message: "Your password has been reset successfully." };

  // ── Real API (future) ──────────────────────────────────────────────────────
  // const res = await fetch("/api/auth/reset-password", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ newPassword }),
  // });
  // if (!res.ok) throw new Error((await res.json()).message ?? "Reset failed");
  // return res.json();
}
