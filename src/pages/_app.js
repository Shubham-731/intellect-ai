import "@/styles/globals.css";
import { Roboto } from "@next/font/google";
import LoadingBar from "react-top-loading-bar";
import { useRef, useEffect } from "react";
import colors from "@/utils/colors";
import { useRouter } from "next/router";
import AuthContextProvider from "@/contexts/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      ref.current?.continuousStart();
    });

    router.events.on("routeChangeComplete", () => {
      ref.current?.complete();
    });
  }, [router]);

  return (
    <>
      <LoadingBar
        color={colors.accent}
        ref={ref}
        shadow={true}
        height={3}
        waitingTime={400}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={roboto.className}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </div>
    </>
  );
}
