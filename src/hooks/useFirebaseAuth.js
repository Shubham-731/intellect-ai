import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { formatAuthUser, formatFbAuthCode } from "@/utils/format";

// Create custom usefirebaseAuth hook
export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAuthState = (authState) => {
    try {
      if (!authState) {
        setAuthUser(null);
        return;
      }

      const formattedUser = formatAuthUser(authState);
      setAuthUser(formattedUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const signUp = async (fullName, email, password) => {
    try {
      const user = (await createUserWithEmailAndPassword(auth, email, password))
        .user;

      // Update profile
      await updateProfile(user, {
        displayName: fullName,
      });

      // Send verification email
      await sendEmailVerification(user);

      return { status: "success", msg: "User registered!", user };
    } catch (error) {
      return { status: "error", msg: formatFbAuthCode(error.code), error };
    }
  };

  // Login user
  const signIn = async (email, password) => {
    try {
      const user = (await signInWithEmailAndPassword(auth, email, password))
        .user;

      // Send verification email
      await sendEmailVerification(user);

      return { status: "success", msg: "User logged in!", user };
    } catch (error) {
      return { status: "error", msg: formatFbAuthCode(error.code), error };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  // Send email verification link
  const verifyEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      return { status: "success", msg: "Email verification sent!" };
    } catch (error) {
      return { status: "error", msg: formatFbAuthCode(error.code) };
    }
  };

  // Continue with google
  const continueWithGoogle = async () => {
    try {
      // Init google auth provider
      const provider = new GoogleAuthProvider();

      // Get user
      // const user = (await signInWithPopup(auth, provider)).user;
      signInWithRedirect(auth, provider);
      const user = (await getRedirectResult(auth)).user;

      return { status: "success", msg: "User logged in!", user };
    } catch (error) {
      return { status: "error", msg: formatFbAuthCode(error.code), error };
    }
  };

  // Listen for authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthState);

    return () => unsubscribe();
  }, []);

  // Return user and auth methods
  return {
    authUser,
    loading,
    signUp,
    signIn,
    logout,
    verifyEmail,
    continueWithGoogle,
  };
}
