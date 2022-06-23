import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext('light');
const SidePanelContext = createContext({})


export function AppWrapper({ children }) {
    const [themeState, setThemeState] = useState('light');
    const [sidePanelState, setSidePanelState] = useState(false);


    const themeValue = useMemo(() => {
        return [themeState, setThemeState];
    }, [themeState, setThemeState]);

    const sidePanelValue = useMemo(() => {
        return [sidePanelState, setSidePanelState];
    }, [sidePanelState, setSidePanelState]);

    return (
        <ThemeContext.Provider value={themeValue}>
            <SidePanelContext.Provider value={sidePanelValue}>
                {children}
            </SidePanelContext.Provider>
        </ThemeContext.Provider>
    );
}
export function useThemeContext() {
    return useContext(ThemeContext);
}
export function useSidePanelContext() {
    return useContext(SidePanelContext);
}