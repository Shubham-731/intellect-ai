import AuthComp from "@/components/AuthComp";
import Head from "next/head";
import { useFormik } from "formik";
import { validateSignin } from "@/validation/auth";
import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Signin = () => {
  const { signIn, authUser, loading } = useAuth();

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
    validationSchema: validateSignin,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await signIn(values.email, values.password);

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
        <title>Log In | IntellectAI</title>
      </Head>
      <AuthComp type={"signin"} formik={formik} />
    </>
  );
};

export default Signin;
