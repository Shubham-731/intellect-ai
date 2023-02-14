import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authContext";

export default function Home() {
  const { authUser, loading, logout } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push(`/auth/signin`);
      } else if (!authUser.emailVerified) {
        router.push("/auth/verify-email");
      } else if (authUser) {
        router.push("/chat");
      }
    }
  }, [authUser, loading]);

  return (
    <>
      {!loading && (
        <main>
          <h1 className="text-3xl font-bold underline">
            You are authenticated!
          </h1>
          <button onClick={logout}>logout</button>
        </main>
      )}
    </>
  );
}
