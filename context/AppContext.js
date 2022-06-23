import { createContext, useContext, useMemo } from "react";

const ThemeContext = createContext('light');
const SidePanelContext = createContext({ showSidePanel: false })


export function AppWrapper({ children }) {
    const [themeState, setThemeState] = useState({});
    const [sidePanelState, setSidePanelState] = useState({});


    const themeValue = useMemo(() => {
        return [themeState, setThemeState];
    }, [themeState, setThemeState]);

    const sidePanelValue = useMemo(() => {
        return [appState, setAppState];
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