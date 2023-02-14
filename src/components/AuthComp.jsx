import Image from "next/image";
import Link from "next/link";
import Topbar from "./Topbar";
import Spinner from "./Spinner";
import { useAuth } from "@/contexts/authContext";
import { toast } from "react-toastify";

const AuthComp = ({ type, formik }) => {
  const { continueWithGoogle } = useAuth();

  const handleGoogle = async () => {
    const res = await continueWithGoogle();
    console.log(res);
    if (res.status === "error") {
      toast.error(res.msg);
    }
  };

  return (
    <div>
      <Topbar />

      <div className="max-w-sm mx-auto p-4 text-center">
        <div>
          <div className="mb-8 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {type === "signup" ? "Create your account" : "Welcome back!"}
            </h1>
            {type === "signup" && (
              <p className="text-black/80 dark:text-white/80 leading-4 text-xs sm:text-sm max-w-xs mx-auto">
                Please note that email verification is required for signup. Your
                email will only be used to verify your identity for security
                purposes.
              </p>
            )}
          </div>

          <div className="">
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4 mb-8">
                {type === "signup" && (
                  <div>
                    <input
                      type="text"
                      className={`w-full p-3 border border-solid border-slate-400 text-sm sm:text-base rounded`}
                      placeholder="Full Name"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      id="fullName"
                      name="fullName"
                    />

                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="text-left text-sm text-red-400">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <input
                    type="text"
                    className={`w-full p-3 border border-solid border-slate-400 text-sm sm:text-base rounded`}
                    placeholder="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    id="email"
                    name="email"
                  />

                  {formik.touched.email && formik.errors.email && (
                    <p className="text-left text-sm text-red-400">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    className={`w-full p-3 border border-solid border-slate-400 text-sm sm:text-base rounded`}
                    placeholder={
                      type === "signup" ? "Create password" : "Password"
                    }
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    id="password"
                    name="password"
                  />

                  {formik.touched.password && formik.errors.password && (
                    <p className="text-left text-sm text-red-400">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              {!formik.isValidating && formik.isSubmitting ? (
                <button
                  className={`cursor-progress w-full py-3 rounded text-center bg-transparent border border-solid border-[#ea515c]`}
                >
                  <Spinner />
                </button>
              ) : (
                <button className="bg-[#ea515c] transition text-sm sm:text-lg py-3 w-full font-semibold tracking-wide text-white hover:bg-red-500 rounded text-center">
                  Continue
                </button>
              )}
            </form>

            <div className="mt-3">
              <p className="text-sm text-slate-700 dark:text-white/80 space-x-1">
                <span>
                  {type === "signup"
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </span>
                <span className="text-[#ea515c] font-semibold">
                  {type === "signup" ? (
                    <Link href="/auth/signin">Log In</Link>
                  ) : (
                    <Link href="/auth/signup">Sign Up</Link>
                  )}
                </span>
              </p>

              <div className="flex items-center my-5">
                <span className="flex-grow h-[2px] bg-slate-300 dark:bg-white/50"></span>
                <span className="uppercase text-sm mx-2">or</span>
                <span className="flex-grow h-[2px] bg-slate-300 dark:bg-white/50"></span>
              </div>

              <button
                onClick={handleGoogle}
                className="border flex items-center dark:hover:bg-white/10 hover:bg-black/10 transition gap-3 border-slate-600 rounded w-full px-4 py-3 text-left"
              >
                <Image
                  src={"/pngs/google.png"}
                  width={24}
                  height={24}
                  alt="Continue with google"
                />
                <span className="text-sm sm:text-base">
                  Continue with Google
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComp;
