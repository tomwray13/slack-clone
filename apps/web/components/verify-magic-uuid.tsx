"use client";

import { useEffect } from "react";
import { magicVerify } from "../data";
import { useRouter } from "next/navigation";

export default function VerifyMagicUiid({ uuid }: { uuid: string }) {
  const router = useRouter();
  useEffect(() => {
    async function callAuth() {
      try {
        await magicVerify({ uuid });
        router.push(`/`);
      } catch (error) {
        router.push(`/auth/signin`);
      }
    }
    callAuth();
  });
  return <div></div>;
}
