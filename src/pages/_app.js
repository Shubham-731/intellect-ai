import "@/styles/globals.css";
import { Roboto } from "@next/font/google";
import LoadingBar from "react-top-loading-bar";
import { useRef, useEffect } from "react";
import colors from "@/utils/colors";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import seo from "@/utils/seo";
import Head from "next/head";
import Header from "@/components/Header";
import Providers from "@/lib/Providers";

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
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={roboto.className}>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme={"dark"}
        />

        <Providers>
          <div
            className={!Component.getLayout ? `flex flex-col md:flex-row` : ""}
          >
            {!Component.getLayout && <Header />}
            <Component {...pageProps} />
          </div>
        </Providers>
      </main>
    </>
  );
}
