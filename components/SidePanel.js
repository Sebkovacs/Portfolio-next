import side from '../styles/sidePanel.module.css'
import { useState } from 'react';

export default function SidePanel({children, heading, fullHeight}) {

    let [panelOpen, setPanelOpen] = useState(false);

    function toggle() {setPanelOpen(!panelOpen)};

    let mobileDevice = false;
    let panelWidth = "";

    if (window.innerWidth <= 425) {
        mobileDevice=true;
    }

    switch (mobileDevice) {
        case true:
            panelWidth = "-100%";
            break;
        case false:
            panelWidth = "-300px";
            break;

        default:
            panelWidth = "-300px";
    }
    console.log(window.innerWidth)
    console.log("mobile?", mobileDevice)
    console.log("is the panel open?", panelOpen)
    

    return (
        <aside
            className={`${side.panel} ${fullHeight ? side.fullHeight : side.normalHeight}`}
            style={{ right: panelOpen ? `${panelWidth}` : "0px" , height: mobileDevice? "auto" : "100%" }}>

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
            

        </aside>
    )
}