import { NextSeo } from "next-seo";
import Prompt from "@/components/Prompt";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import ChatComp from "@/components/Conversations/ChatComp";
import { useFormik } from "formik";

const ChatHome = () => {
  const { authUser, loading } = useAuth();
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

  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    onSubmit: (values, actions) => {
      console.log(values);
    },
  });

  return (
    <>
      <NextSeo title="Chat | IntellectAI" />

      <div className="relative w-full h-screen">
        <Prompt formik={formik} />

        <div className="max-h-screen scrollbar-thin scrollbar-thumb-black/50 dark:scrollbar-thumb-white/50 scrollbar-thumb-rounded-xl">
          <div className="w-full h-14 md:h-0 flex-shrink-0" />

          <ChatComp
            userMsg={`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, tenetur.`}
            botMsg={`
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem facilis ipsa expedita consectetur ad eos ipsam, quos iste doloremque dolore, a voluptatum velit nobis dolores! Mollitia error dolore et nesciunt!`}
          />
          <ChatComp
            userMsg={`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, tenetur.`}
            botMsg={`
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem facilis ipsa expedita consectetur ad eos ipsam, quos iste doloremque dolore, a voluptatum velit nobis dolores! Mollitia error dolore et nesciunt!`}
          />
          <ChatComp
            userMsg={`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, tenetur.`}
            botMsg={`
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem facilis ipsa expedita consectetur ad eos ipsam, quos iste doloremque dolore, a voluptatum velit nobis dolores! Mollitia error dolore et nesciunt!`}
          />
          <ChatComp
            userMsg={`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, tenetur.`}
            botMsg={`
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem facilis ipsa expedita consectetur ad eos ipsam, quos iste doloremque dolore, a voluptatum velit nobis dolores! Mollitia error dolore et nesciunt!`}
          />
          <ChatComp
            userMsg={`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, tenetur.`}
            botMsg={`
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem facilis ipsa expedita consectetur ad eos ipsam, quos iste doloremque dolore, a voluptatum velit nobis dolores! Mollitia error dolore et nesciunt!`}
          />

          <div className="w-full h-32 md:h-40 flex-shrink-0" />
        </div>
      </div>
    </>
  );
};

export default ChatHome;
