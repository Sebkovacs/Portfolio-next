import side from '../styles/sidePanel.module.css'
import { useState } from 'react';
import { useEffect } from 'react'

export default function SidePanel({ children, heading }) {

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

                <div className={side.background} onClick={toggle} style={{ opacity: panelOpen ? "1" : "0", display: panelOpen ? "block" : "none" }}/>

        </aside>
    )
}