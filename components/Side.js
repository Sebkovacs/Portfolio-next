import sidePanel from '../styles/sidePanel.module.css'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useSidePanelContext, useThemeDark } from '../context/AppContext'
import { useRouter } from 'next/router'
import filters from '../styles/filters.module.css'
import Projects from '../pages'
import { useState } from 'react'
import theme from '../styles/theme.module.css'

export default function Side({ children, title, heading, data }) {

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


    return (
        <aside className={`${themeDark ? theme.lightmode : theme.darkmode} ${sidePanelState ? styles.sideBarOpen : styles.sideBarClosed}`}>
            <div className={`${utilStyles.title}`}>
                <span className={sidePanel.sidePanelTitle}>{heading}</span>
            </div>




            <div className={`${themeDark ? theme.lightmode : theme.darkmode} ${sidePanel.content}`} style={{ overflow: !sidePanelState && "hidden" }}>
                {children}

                {title == "Projects" && data.map((e, index) =>

                    <div className={filters.link}>
                        <div className={filters.projNum}>{index}</div>
                        <div className={filters.col}>
                            <Link href={`${pageTitle}/${e.id}`}>
                                <a id={e.id} style={{ fontWeight: 800 }}>
                                    {e.title}
                                </a>
                            </Link>
                            
                                <a href="#" key={e.id} style={{ color: "var(--s1)"}}>
                                    {e.type}
                                </a>
                            
                            {e.work == "Construction" && <p style={{margin: "0", fontSize: "0.5rem", backgroundColor: themeDark ? "var(--s2)" : "var(--s1)"}}>  *Worked on Construction*</p>}
                        </div>
                    </div>
                )}

            </div>
            <div className={sidePanel.toggleButtonGroup}>

                <div id={sidePanel.sidePanel} className={sidePanel.leftPanelToggleButton}
                    // style={{ width: sidePanelState ? " 11.5rem" : " unset"}}
                    onClick={sidePanelToggle}>
                    {sidePanelState
                        ? <span class="material-symbols-outlined">arrow_back</span>
                        : <span class="material-symbols-outlined">arrow_forward</span>}
                </div>

                {title == "Contact" ?
                    <button id={sidePanel.contact} className={`${sidePanel.leftPanelToggleButton} ${themeDark ? theme.lightmode : theme.darkmode}`} type="button" onClick={() => router.back()} alt={"Click here to go back"}>
                        
                    </button>
                    :
                    <Link href="/contact">
                        <a id={sidePanel.contact} className={`${sidePanel.leftPanelToggleButton} ${themeDark ? theme.lightmode : theme.darkmode} ${!themeDark && theme.darkNoBorder} `} alt={"Navigate to Contact Page"}

                        // style={{ width: sidePanelState ? " 11.5rem" : " unset"}}
                        >
                            
                        </a>
                    </Link>
                }

                <div id={sidePanel.theme} className={sidePanel.leftPanelToggleButton}
                    // style={{ width: sidePanelState ? " 11.5rem" : " unset"}}
                    onClick={themeToggle}>
                    {themeDark
                        ? <span class="material-symbols-outlined">dark_mode</span>
                        : <span class="material-symbols-outlined">light_mode</span>}
                </div >
            </div>



        </aside>
    )
}
