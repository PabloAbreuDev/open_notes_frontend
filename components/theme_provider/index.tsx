import { useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ConfigContext } from "../../context/ConfigContext";
export const darkTheme = {
    primaryColor: "#202024",
    secondaryColor: "#121214",
    tertiaryColor: "#202024",
    text: "#F1F3F4"
};

export const lightTheme = {
    primaryColor: "#00A32C",
    secondaryColor: "#F1F3F4",
    tertiaryColor: "#0D130C",
    text: "#121214",
};

const Theme = ({ children }: any) => {
    const {
        theme,
    } = useContext(ConfigContext);


    return <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>{children}</ThemeProvider>
};

export default Theme