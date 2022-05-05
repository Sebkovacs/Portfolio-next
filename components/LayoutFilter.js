import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Header from './Header'
import Footer from './Footer'
import { useState } from "react";
import Link from 'next/link'



export const siteTitle = 'SK'


export default function Layout({ children, title}) {
    const [sideBar, setSideBarOpen] = useState(false)
    const [filters, setFilters] = useState([])

    function toggle(){setSideBarOpen(!sideBar);}

    const types = ["Residential", "Mult-Residential", "Commercial", "Education", "Health"]
    const status = ["constructed", "In Construction", "DA", "CC", "Concept"]
    const software = ["revit", "vectorworks", "twinmotion", "rhino", "lumion", "archiCAD"]

    const modFilter = (e) => {
        
         if (filters.includes(e.target.id) == false) {
            filters.push(e.target.id);
        } else {
            let index = filters.indexOf(e.target.id);
            filters.splice(index,1);
        };

        console.log(filters);
    }

    const filtersList = filters.map((filter) => (
        <div className={styles.filter} onClick={modFilter} id={filter} key={filter} >{filter}</div>
    ));

    
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
                    <h1>Filters</h1>
                    <div className={styles.filterContainer}>

                            <small>Filters</small>
                        <div className={styles.filters} >
                            {filtersList}
                        </div>
                        {/* <div className={utilStyles.bb1} /> */}

                            <small>Tags</small>

                        <details><summary>Type</summary>
                            <div className={styles.tags}>
                                {types.map((type) => <div className={styles.tag} id={type} key={type} onClick={modFilter} >{type}</div>)}
                            </div>
                        </details>
                        <details><summary>Status</summary>
                            <div className={styles.tags}>
                                {status.map((status) => <div className={styles.tag} id={status} key={status} onClick={modFilter}>{status}</div>)}
                            </div>
                        </details>
                        <details><summary>Software</summary>
                            <div className={styles.tags}>
                                {software.map((software) => <div className={styles.tag} id={software} key={software} onClick={modFilter}>{software}</div>)}
                            </div>
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