"use client";
import { SESSION_ID_LENGTH, SUCCESS_MESSAGE } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userContext = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const { sessionId } = userContext.state;
    if (!sessionId || sessionId.length !== SESSION_ID_LENGTH) {
      router.push("/");
    }

    const verifySessionId = async () => {
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({
          sessionId,
        }),
      });
      const data = await res.json();
      if (data.message !== SUCCESS_MESSAGE) {
        router.push("/");
      }
    };
    verifySessionId();
  });
  return <>{children}</>;
}
