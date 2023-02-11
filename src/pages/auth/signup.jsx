import AuthComp from "@/components/AuthComp";
import Head from "next/head";
import { useFormik } from "formik";
import { validateSignup } from "@/validation/auth";
import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Signup = () => {
  const { signUp, authUser, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (authUser) {
        router.push("/");
      } else if (authUser && !authUser.emailVerified) {
        router.push(`/auth/verify-email`);
      }
    }
  });

  const formik = useFormik({
    validationSchema: validateSignup,
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await signUp(
          values.fullName,
          values.email,
          values.password
        );

        if (res.status === "success") {
          actions.resetForm();
        } else if (res.status === "error") {
          toast.error(res.msg);
        }
      } catch (err) {
        console.log(err);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Create new account | IntellectAI</title>
      </Head>
      {!loading && <AuthComp type={"signup"} formik={formik} />}
    </>
  );
};

export default Signup;
