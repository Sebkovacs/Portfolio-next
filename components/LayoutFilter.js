import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Header from './Header'
import HoverTop from './HoverTop'
import Footer from './Footer'
import Link from 'next/link'
import { useState } from "react";
import { id } from 'date-fns/locale'
import Filters from './Filters'
import Projects from '../pages'


export const siteTitle = 'Sebastian Kovacs'

export default function Layout({ children, title}) {
    const [sideBar, setSideBarOpen] = useState(true)
    function toggle(){setSideBarOpen(!sideBar);}

    const [filters, setFilters] = useState(["vectorworks", "twinmotion",]);



    // console.log(filters)
    return (
        <>
            <Head>
            <title>{siteTitle} | {title}</title>
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

            
            <div id={styles.layout}>
            <aside className={sideBar? styles.sideBarOpen : styles.sideBarClosed }>
                    
                    <div id={styles.icon} onClick={toggle}> <span class="material-symbols-outlined">navigate_next</span> </div>


                    <div className={utilStyles.title}>
                    <h1>Filters</h1>
                    </div>
                    <Filters setFilters={setFilters} filters={filters}/>
            </aside>



            <main className={sideBar? styles.bodyOpen : styles.bodyClosed }>
                {children}
            </main>
            </div>
            {/* <Footer /> */}
       </>
    )
}

