import Image from "next/image";
import Link from "next/link";
import Topbar from "./Topbar";
import Spinner from "./Spinner";
import colors from "@/utils/colors";
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
            <h1 className="text-3xl font-semibold">
              {type === "signup" ? "Create your account" : "Welcome back!"}
            </h1>
            {type === "signup" && (
              <p className="text-slate-600 leading-4 text-sm max-w-xs mx-auto">
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
                      className={`w-full p-3 border border-solid border-slate-400 focus:outline-1 outline-[#ea515c] rounded`}
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
                    className={`w-full p-3 border border-solid border-slate-400 focus:outline-1 outline-[#ea515c] rounded`}
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
                    className={`w-full p-3 border border-solid border-slate-400 focus:outline-1 outline-[#ea515c] rounded`}
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

              <button
                className={`bg-[${
                  colors.accent
                }] transition py-3 w-full text-lg text-white hover:bg-red-500 rounded text-center ${
                  !formik.isValidating &&
                  formik.isSubmitting &&
                  `cursor-not-allowed bg-white pointer-events-none border border-solid border-[${colors.accent}]`
                }`}
                type="submit"
              >
                {!formik.isValidating && formik.isSubmitting ? (
                  <Spinner />
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            <div className="mt-3">
              <p className="text-sm text-slate-700 space-x-1">
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
                <span className="flex-grow h-[2px] bg-slate-300"></span>
                <span className="uppercase text-sm mx-2">or</span>
                <span className="flex-grow h-[2px] bg-slate-300"></span>
              </div>

              <button
                onClick={handleGoogle}
                className="border flex items-center hover:bg-slate-100 transition gap-3 border-slate-600 rounded w-full px-4 py-3 text-left"
              >
                <Image
                  src={"/pngs/google.png"}
                  width={32}
                  height={32}
                  alt="Continue with google"
                />
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComp;
