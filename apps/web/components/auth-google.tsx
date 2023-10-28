"use client";

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { handleGoogleAuth } from "../data";

const GoogleAuth = () => {
  const router = useRouter();
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  console.log(`googleClientId`, googleClientId);
  const continueWithGoogle = async (response: CredentialResponse) => {
    try {
      if (!response.credential) return;
      await handleGoogleAuth({ token: response.credential });
      router.push(`/`);
    } catch (error) {
      router.push(`/auth/signin`);
    }
  };
  return (
    <GoogleOAuthProvider clientId={googleClientId || ``}>
      <GoogleLogin
        width={`100%`}
        text="signin"
        useOneTap={false}
        onSuccess={continueWithGoogle}
      />
    </GoogleOAuthProvider>
  );
};

export { GoogleAuth };
