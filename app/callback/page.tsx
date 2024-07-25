"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { TOKEN } from "@/constants";

export default function GoogleCallback() {
  const userContext = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    const localState = localStorage.getItem(TOKEN);
    if (localState !== state) {
      router.push("/");
    }
    const fetchSessionId = async () => {
      const res = await fetch(`/api/oauth-token`, {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      const { sessionId } = await res.json();
      userContext.set({ sessionId });
    };
    fetchSessionId();
  });

  return (
    <div>
      {code && state ? (
        <div>
          <h2>Successfully authenticated</h2>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
