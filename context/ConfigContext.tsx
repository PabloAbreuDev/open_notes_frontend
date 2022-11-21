import { createContext, useState } from "react";

type ConfigContextType = {
    menuOpen: boolean;
    toggleMenuOpen: () => void;
    theme: string;
    toggleTheme: () => void;

};

export const ConfigContext = createContext({} as ConfigContextType);

export function ConfigProvider({ children }: any) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>("light")

    function toggleTheme() {
        theme === "dark" ? setTheme("light") : setTheme("dark")
        return
    }


    function toggleMenuOpen() {
        setMenuOpen(!menuOpen)
        return
    }

    return (
        <ConfigContext.Provider
            value={{
                menuOpen,
                toggleMenuOpen,
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}
