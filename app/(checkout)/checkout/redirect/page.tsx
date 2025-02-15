"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutRedirectPage() {
  const [countDown, setCountDown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const countDownId = setInterval(() => {
      setCountDown((seconds) => seconds - 1);
    }, 1000);
    return () => {
      clearInterval(countDownId);
    };
  }, []);

  useEffect(() => {
    if (countDown === 1) {
      router.replace("/");
    }
  }, [countDown]);

  return (
    <div className="text-center font-bold">
      <div>На Вашу почту отправлена ссылка на оплату.</div>
      <div>
        Вы будете перенаправлены на главную страницу через{" "}
        <span className="text-primary">{countDown}</span>
      </div>
    </div>
  );
}
