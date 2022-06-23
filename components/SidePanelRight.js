import side from '../styles/sidePanel.module.css'
import utilStyles from '../styles/utils.module.css'
import { useState } from 'react';

export default function SidePanelRight({ children, heading }) {

    let [panelOpen, setPanelOpen] = useState(false);

    function toggle() { setPanelOpen(!panelOpen) };

    return (
        <aside>

                <div
                    className={side.panel}
                    style={{ right: panelOpen ? "0px" : "-300px" }}>

                    <div
                        className={side.toggle}
                        onClick={toggle}
                        style={{ transition: "ease 1s", border: panelOpen ? "2px solid var(--border1)" : "2px solid transparent" }}
                    >
                        {panelOpen ? <span class="material-symbols-outlined">
                            navigate_next
                        </span> : <span class="material-symbols-outlined">
                            navigate_before
                        </span>}
                    </div>

                    <h3>{heading}</h3>
                    {children}

                </div>

                <div className={`${utilStyles.mobileOnly} ${side.background} }`} onClick={toggle} style={{ display: !panelOpen && "none"}}/>

        </aside>
    )
}