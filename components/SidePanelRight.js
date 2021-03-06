import side from '../styles/sidePanel.module.css'
import utilStyles from '../styles/utils.module.css'
import { useState } from 'react';
import theme from '../styles/theme.module.css'
import { useThemeDark } from '../context/AppContext'

export default function SidePanelRight({ children, heading }) {

    let [panelOpen, setPanelOpen] = useState(false);
    const [themeDark, setThemeDark] = useThemeDark();

    function toggle() { setPanelOpen(!panelOpen) };

    return (
        <aside>

                <div
                    className={side.panel}
                    style={{ right: panelOpen ? "0" : "-250px", boxShadow: themeDark && " 5px 5px 20px var(--s3)"}}>

                    <div
                        className={side.toggle}
                        id={themeDark && theme.darkmodeAltBG}
                        onClick={toggle}
                        style={{ transition: "all 1s", border: panelOpen ? "2px solid var(--border1)" : "2px solid transparent" }}
                    >
                        {panelOpen ? <span class="material-symbols-outlined" >
                            navigate_next
                        </span> : <span class="material-symbols-outlined">
                            navigate_before
                        </span>}
                    </div>

                    <h3>{heading}</h3>
                    {children}

                </div>

                <div className={`${utilStyles.mobileOnly} ${side.background} }`} onClick={toggle} style={{display: !panelOpen && "none",transition: ".5s ease .5s", opacity: panelOpen ? themeDark ? ".8" : ".8" : "0"}}/>

        </aside>
    )
}