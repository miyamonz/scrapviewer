import type { AppProps } from "next/app";
import { Provider } from "jotai";

export default function App(appProps: AppProps) {
  const { Component, pageProps } = appProps;
  return (
    <Provider>
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </div>
    </Provider>
  );
}
