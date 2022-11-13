import { createContext, useState } from "react";

type ConfigContextType = {
    menuOpen: boolean;
    toggleMenuOpen: () => void

};

export const ConfigContext = createContext({} as ConfigContextType);

export function ConfigProvider({ children }: any) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    function toggleMenuOpen() {
        setMenuOpen(!menuOpen)
        return
    }

    return (
        <ConfigContext.Provider
            value={{
                menuOpen,
                toggleMenuOpen
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}
