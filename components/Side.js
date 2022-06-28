import sidePanel from '../styles/sidePanel.module.css'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useSidePanelContext, useThemeDark } from '../context/AppContext'
import { useRouter } from 'next/router'
import filters from '../styles/filters.module.css'

import { useEffect, useState } from 'react'
import theme from '../styles/theme.module.css'

export default function Side({ children, title, heading, data, h1 }) {
    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 768) {
            setIsMobile(true)
        } else { setIsMobile(false)}
    }, [])

    const router = useRouter()
    const [themeDark, setThemeDark] = useThemeDark();
    const [sidePanelState, setSidePanelState] = useSidePanelContext();

    function themeToggle() {
        setThemeDark(prevThemeState => !prevThemeState)
    }
    function sidePanelToggle() {
        setSidePanelState(prevSidePanelState => !prevSidePanelState)
    }

    let pageTitle = title.toLowerCase();

    let [filterList, setFilterList] = useState([])

    const modFilters = e => {
        if (!filterList.includes(e.target.id)) {
            setFilterList(filterList.push(e.target.id))
        } else {
            let index = filterList.indexOf(e.target.id);
            setFilterList(filterList.splice(index, 1));
        }
        setFilterList([...filterList]);
    };

    function clearFilters() {
        setFilterList([])
    }

    let [showContent, setShowContent] = useState(true)

    useEffect(() => {
        if (isMobile && !sidePanelState) {
            return setShowContent(showContent = true)
        } else if (!isMobile && sidePanelState) {
            return setShowContent(showContent = true)
        } else  {
            return setShowContent(showContent = false)
        }
    })


    return (
         <aside className={`${themeDark && theme.darkmode}  ${sidePanelState ? styles.sideBarOpen : styles.sideBarClosed} `} >
            <div className={`${utilStyles.title}`}>
                {h1 != undefined 
                ? <h1 style={{ overflow: !sidePanelState && "hidden", opacity: showContent ?  "1" : "0", transition: "1s"}}>{h1}</h1> 
                : <span className={sidePanel.sidePanelTitle} style={{ opacity: showContent ?  "1" : "0", transition: "1s"}}>{heading}</span>}
            </div>

            <div className={` ${sidePanel.content}`} style={{ overflow: !sidePanelState && "hidden", opacity: showContent ?  "1" : "0", transition: "1s"}} id={themeDark && theme.darkmode}>
                {children}

                {title == "Projects" && data.map((e, index) =>
                <Link href={`${pageTitle}/${e.id}`}>
                    <a className={filters.link} id={themeDark && theme.darkmodeT}>
                        
                            <div className={filters.projNum}>{index + 1}</div>
                            <div className={filters.col}>
                                
                                    <p id={e.id} style={{ fontWeight: 800, fontSize: ".8rem", margin: 0 }} >
                                        {e.title}
                                    </p>
                                
                                <div style={{display: "flex", flexDirection:'row', fontFamily:'var(--font2)'}}>
                                    <span style={{ fontSize: "0.7rem", color: themeDark ? "var(--p2)" : "var(--s1)", margin: 0, fontFamily:'var(--font2)'}}>
                                        {e.type}</span>
                                        {e.work == "Construction" &&<span  
                            style={{ fontFamily:'var(--font2)', margin: "0 0 0 .5rem", fontSize: "0.6rem", backgroundColor: themeDark ? "var(--t1)" : "var(--s2)", color: themeDark ? "var(--border1)" : "var(--s3)"}}
                            >*Worked on Construction*</span>}
                                    
                            
                                {/* {e.work == "Construction" && <p style={{margin: "0", fontSize: "0.5rem", backgroundColor: themeDark ? "var(--s3)" : "var(--s2)", color: themeDark ? "var(--border1)" : "var(--s3)"}}>  *Worked on Construction*</p>} */}
                            </div>
                        </div>
                             
                    </a>
                    </Link>
                )}

            </div>
            <div className={`${sidePanel.pcOnly} ${sidePanel.toggleButtonGroup}`} id={themeDark && theme.darkmodeSolid}>

                <div id={sidePanel.sidePanel} className={sidePanel.leftPanelToggleButton}
                    
                    onClick={sidePanelToggle}>
                    {sidePanelState
                        ? <span class="material-symbols-outlined">arrow_back</span>
                        : <span class="material-symbols-outlined">arrow_forward</span>}
                </div>

                {title == "Contact" ?
                    <button id={sidePanel.contact}  className={`${sidePanel.leftPanelToggleButton} ${themeDark && theme.darkmode}`} type="button" onClick={() => router.back()} alt={"Click here to go back"}>
                        
                    </button>
                    :
                    <Link href="/contact">
                        <a id={sidePanel.contact}   className={`${sidePanel.leftPanelToggleButton} ${themeDark && theme.darkmode} ${themeDark && theme.darkNoBorder} `} alt={"Navigate to Contact Page"}

                        // style={{ width: sidePanelState ? " 11.5rem" : " unset"}}
                        >
                            
                        </a>
                    </Link>
                }

                <div id={sidePanel.theme} className={sidePanel.leftPanelToggleButton}
                    
                    onClick={themeToggle}>
                    {themeDark
                        ? <span class="material-symbols-outlined">dark_mode</span>
                        : <span class="material-symbols-outlined">light_mode</span>}
                </div >
            </div>



        </aside>
    )
}
