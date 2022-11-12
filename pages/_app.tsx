import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { NoteProvider } from "../context/NoteContext";
import { NoteBookProvider } from "../context/NoteBookContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoteBookProvider>
      <NoteProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </NoteProvider>
    </NoteBookProvider>


  );
}

export default MyApp;
