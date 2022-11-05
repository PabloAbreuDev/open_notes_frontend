import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { NoteProvider } from "../context/NoteContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoteProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NoteProvider>

  );
}

export default MyApp;
