import { createContext, useContext, useMemo, useState } from "react";

const ThemeDark = createContext(true);
const SidePanelContext = createContext({})


export function AppWrapper({ children }) {
    const [themeDark, setThemeDark] = useState(true);
    const [sidePanelState, setSidePanelState] = useState(false);


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