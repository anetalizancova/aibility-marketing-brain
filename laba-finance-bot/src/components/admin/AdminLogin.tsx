"use client";

import { useState } from "react";

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onLogin();
      } else {
        setError("Špatné heslo.");
      }
    } catch {
      setError("Nepodařilo se připojit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-bg">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-5">
        <div>
          <h1 className="font-display font-bold text-xl tracking-tight">Správa Q&A</h1>
          <p className="text-[13px] text-text-muted mt-0.5">Finance Bot &mdash; admin</p>
        </div>

        <div className="space-y-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Heslo"
            className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border text-[15px] transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
            autoFocus
          />
          {error && <p className="text-[13px] text-error">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 rounded-xl bg-text text-bg font-display font-semibold text-[14px] transition-all duration-200 hover:opacity-90 disabled:opacity-30"
        >
          {loading ? "..." : "Přihlásit"}
        </button>
      </form>
    </div>
  );
}
