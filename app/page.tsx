"use client";
import { STATE_LENGTH, TOKEN } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const userContext = useUserContext();

  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      counter += 1;
    }
    return result;
  }

  const handleSubmit = async () => {
    console.log("signing in");
    const state = makeid(STATE_LENGTH);
    userContext.set({ state });
    userContext.save();
    const res = await fetch(`/api/oauth-token?state=${state}`);
    router.push(await res.json());
  };
  return (
    <div>
      <button onClick={() => handleSubmit()}>Sign In</button>
    </div>
  );
}
