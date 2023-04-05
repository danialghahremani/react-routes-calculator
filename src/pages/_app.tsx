import "@/styles/globals.scss";

import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#374151",
          colorPrimaryBg: "transparent",
          colorBgContainerDisabled: "#E5E7EB",
          colorBorder: "#E5E7EB",
          colorError: "#FF0000",
          fontSize: 12,
          fontFamily: inter.style.fontFamily,
          borderRadius: 6,
          controlHeight: 32,
        },
        components: {
          Button: {
            colorTextDisabled: "#fff",
            controlHeight: 38,
          },
        },
      }}
    >
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ConfigProvider>
  );
}
