import Head from "next/head";
import seo from "@/utils/seo";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authContext";

export default function Home() {
  const { authUser, loading, logout } = useAuth();
  const router = useRouter();
  console.log(authUser);

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push(`/auth/signin`);
      } else if (!authUser.emailVerified) {
        router.push("/auth/verify-email");
      }
    }
  }, [authUser, loading]);

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
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
