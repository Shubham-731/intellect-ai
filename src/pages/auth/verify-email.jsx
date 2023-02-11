import Topbar from "@/components/Topbar";
import colors from "@/utils/colors";
import Head from "next/head";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { authUser, loading, logout, verifyEmail } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push("/auth/signin");
      } else if (authUser && authUser.emailVerified) {
        router.push("/");
      }
    }
  }, [authUser, loading]);

  const handleEmailVerification = async () => {
    if (!authUser.emailVerified) {
      const res = await verifyEmail();
      if (res.status === "success") {
        toast.success(res.msg);
      } else if (res.status === "error") {
        toast.error(res.msg);
      }
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Verify email address | IntellectAI</title>
      </Head>
      {!loading && (
        <div>
          <Topbar />

          <div className="space-y-4 text-center max-w-[16rem] mx-auto">
            <h1 className="text-2xl font-semibold">Verify your email</h1>
            <p>
              We sent an email to{" "}
              <span className={`text-[${colors.accent}]`}>
                {authUser && authUser.email}
              </span>
              . Click the link inside to get started.
            </p>

            <div className="flex items-center gap-4 justify-center">
              <button
                className={`border border-solid border-[#ea515c] py-3 px-5 tracking-wide rounded-lg hover:bg-[#ea515c] hover:text-white leading-3 font-semibold transition`}
                onClick={handleEmailVerification}
              >
                Resend
              </button>
              <button
                className={`border border-solid border-[#ea515c] py-3 px-5 tracking-wide rounded-lg hover:bg-[#ea515c] hover:text-white leading-3 font-semibold transition`}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
