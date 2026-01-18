import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeDark = createContext();
const SidePanelContext = createContext({})


export function AppWrapper({ children }) {
    const [themeDark, setThemeDark] = useState(false);
    const [sidePanelState, setSidePanelState] = useState(true);


    const themeDarkValue = useMemo(() => {
        return [themeDark, setThemeDark];
    }, [themeDark, setThemeDark]);

    const sidePanelValue = useMemo(() => {
        return [sidePanelState, setSidePanelState];
    }, [sidePanelState, setSidePanelState]);

    // Sync theme with system preference and localStorage; update HTML data attribute
    useEffect(() => {
        try {
            const stored = localStorage.getItem('themeDark');
            if (stored !== null) {
                setThemeDark(stored === 'true');
                return;
            }
        } catch {}
        if (typeof window !== 'undefined' && window.matchMedia) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setThemeDark(prefersDark);
        }
    }, []);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', themeDark ? 'dark' : 'light');
        }
        try {
            localStorage.setItem('themeDark', String(themeDark));
        } catch {}
    }, [themeDark]);

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
