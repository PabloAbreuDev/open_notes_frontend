import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { NoteProvider } from "../context/NoteContext";
import { NoteBookProvider } from "../context/NoteBookContext";
import { ConfigProvider } from "../context/ConfigContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <NoteBookProvider>
        <NoteProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </NoteProvider>
      </NoteBookProvider>
    </ConfigProvider>


  );
}

export default MyApp;
