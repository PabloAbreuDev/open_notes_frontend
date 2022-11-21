import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { NoteProvider } from "../context/NoteContext";
import { NoteBookProvider } from "../context/NoteBookContext";
import { ConfigProvider } from "../context/ConfigContext";
import Theme from "../components/theme_provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <NoteBookProvider>
        <NoteProvider>
          <AuthProvider>
            <Theme>
              <Component {...pageProps} />
            </Theme>
          </AuthProvider>
        </NoteProvider>
      </NoteBookProvider>
    </ConfigProvider>
  );
}

export default MyApp;
