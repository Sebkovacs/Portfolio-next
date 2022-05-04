import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Header from './Header'
import Footer from './Footer'
import { useState } from "react";
import Link from 'next/link'



export const siteTitle = 'SK'


export default function Layout({ children, title}) {
    const [sideBar, setSideBarOpen] = useState(false);

    function toggle(){
        setSideBarOpen(!sideBar);
    }

    const filters = ["all"]

    return (
        <>
            <Head>
                <title>{siteTitle} | {title}</title>
                <link rel="icon" href="/rapotors-favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta 
                name="description"
                content="A practice Website with next.js"
                />
                <meta
                property="og:image"
                content={`https://og-image.now.sh/${encodeURI(
                    siteTitle
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header />

            
            <div id={styles.layout}>
            <aside className={sideBar? styles.sideBarOpen : styles.sideBarClosed }>
                    
                    <div id={styles.icon} onClick={toggle}> > </div>
                    <h1>Filter</h1>
                    <div className={styles.filterContainer}>

                        <div className={utilStyles.bb1}>
                            <small>Filters Applied</small>
                            <div>
                                {filters}
                            </div>




                        </div>

                    <details className={`${styles.filters} ${utilStyles.mt1}`}><summary>Project Type</summary>
                                <ul className={styles.details}>
                                    <li>Residential</li>
                                    <li>Multi-Residential</li>
                                    <li>Commercial</li>
                                </ul>
                        </details>
                        <details className={styles.filters}><summary>Status</summary>
                                <ul className={styles.details}>
                                    <li>Concept</li>
                                    <li>DA</li>
                                    <li>CC</li>
                                    <li>In Construction</li>
                                    <li>Constructed</li>
                                </ul>
                        </details>
                        <details className={styles.filters}><summary>Software</summary>
                                <ul className={styles.details}>
                                    <li>Revit</li>
                                    <li>Vectorworks</li>
                                    <li>Vray</li>
                                    <li>Twinmotion</li>
                                </ul>
                        </details>
                    </div>
            </aside>



            <main className={sideBar? styles.bodyOpen : styles.bodyClosed }>
                {children}
            </main>
            </div>
            {/* <Footer /> */}
       </>
    )
}