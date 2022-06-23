import Head from 'next/head'
import styles from './layout.module.css'
import Header from './Header'
import Footer from './Footer'
import sidePanel from '../styles/sidePanel.module.css'
import Link from 'next/link'

import { useSidePanelContext, useThemeContext } from '../context/AppContext'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const siteTitle = 'Sebastian Kovacs'


export default function Layout({ children, title }) {
    const router = useRouter()

    const [themeState, setThemeState] = useThemeContext();
    const [sidePanelState, setSidePanelState] = useSidePanelContext();


    function themeToggle() {
        setThemeState(prevThemeState => !prevThemeState)
    }
    function sidePanelToggle() {
        setSidePanelState(prevSidePanelState => !prevSidePanelState)
    }

    return (
        <>
            <Head>
                <title>{siteTitle} |</title>
                <link rel="icon" href="/sebastian-kovacs-portfolio.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="Sebastian Kovacs Architecture Portfolio"
                />
                <meta
                    property="og:image"
                    content={'/sebastian-kovacs-og-image.jpg'}
                />
                <meta name="og:title" content={`${siteTitle} Architecture Portfolio`} />
                <meta name="twitter:card" content="summary_large_image" />

            </Head>
            <Header />

            <aside className={styles.sideBarClosed}>
                <div className={sidePanel.toggleButtonGroup}>

                    <div id={sidePanel.sidePanel} className={sidePanel.leftPanelToggleButton} style={{ cursor: "grab" }}
                    // style={{ width: sidePanelState ? " 11.5rem" : " unset"}}
                    >
                        <span class="material-symbols-outlined">circle</span>
                    </div>

                    {title == "Contact" ?
                        <button id={sidePanel.contact} className={sidePanel.leftPanelToggleButton} type="button" onClick={() => router.back()}>
                            Click here to go back
                        </button>
                        :
                        <Link href="/contact">
                            <a id={sidePanel.contact} className={sidePanel.leftPanelToggleButton}

                            // style={{ width: sidePanelState ? " 11.5rem" : " unset"}}
                            >
                                Navigate to Contact Page
                            </a>
                        </Link>
                    }
                    
                    <div id={sidePanel.theme} className={sidePanel.leftPanelToggleButton}
                        // style={{ width: sidePanelState ? " 11.5rem" : " unset"}}
                        onClick={themeToggle}>
                        {themeState
                            ? <span class="material-symbols-outlined">dark_mode</span>
                            : <span class="material-symbols-outlined">light_mode</span>}
                    </div>
                </div>
            </aside>
            <main className={styles.bodyClosed}>
                {children}
            </main>

            {/* <Footer /> */}
        </>
    )
}
