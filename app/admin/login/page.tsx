"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { data: session, isPending: sessionLoading } = authClient.useSession();

  useEffect(() => {
    if (!sessionLoading && session?.user) {
      window.location.href = "/admin";
    }
  }, [session, sessionLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (res.error) {
        setErrorMsg(res.error.message || "Invalid administrator email or password.");
      } else {
        setSuccessMsg("Signed in successfully! Redirecting to dashboard...");
        window.location.href = "/admin";
      }
    } catch (err: any) {
      console.error("Authentication error:", err);
      setErrorMsg(err?.message || "An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-red-500 selection:text-white">
  

      <div className="w-full max-w-md relative z-10">
      

        {/* Card */}
        <div className="bg-[#0e1626]/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white tracking-tight text-center pb-4">
            Administrator Sign In
          </h1>
        

          {/* Feedback messages */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@techshifttechnology.com"
                  className="w-full bg-slate-900/60 border border-slate-800 text-white placeholder:text-slate-600 focus:bg-slate-900 pl-10 pr-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/60 border border-slate-800 text-white placeholder:text-slate-600 focus:bg-slate-900 pl-10 pr-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs md:text-sm transition-all shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

  
        </div>
      </div>
    </div>
  );
}
