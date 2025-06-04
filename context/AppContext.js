import { createContext, useContext, useMemo, useState, useEffect } from "react";

const ThemeDark = createContext();
const SidePanelContext = createContext({})


export function AppWrapper({ children }) {
    const [themeDark, setThemeDark] = useState(false);
    const [sidePanelState, setSidePanelState] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('themeDark');
        if (stored === 'true') {
            setThemeDark(true);
        }
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = themeDark ? 'dark' : 'light';
        localStorage.setItem('themeDark', themeDark);
    }, [themeDark]);


    const themeDarkValue = useMemo(() => {
        return [themeDark, setThemeDark];
    }, [themeDark, setThemeDark]);

    const sidePanelValue = useMemo(() => {
        return [sidePanelState, setSidePanelState];
    }, [sidePanelState, setSidePanelState]);

    return (
        <ThemeDark.Provider value={themeDarkValue}>
            <SidePanelContext.Provider value={sidePanelValue}>
                {children}
            </SidePanelContext.Provider>
        </ThemeDark.Provider>
    );
}
export function useThemeDark() {
    return useContext(ThemeDark);
}
export function useSidePanelContext() {
    return useContext(SidePanelContext);
}