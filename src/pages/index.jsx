import { useEffect } from "react";
import { NextSeo } from "next-seo";
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
      <NextSeo title="Home | IntellectAI" />
    </>
  );
}

Home.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
