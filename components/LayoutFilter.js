import Head from 'next/head'
import styles from './layout.module.css'
import Header from './Header'
import Side from './Side'
import { useSidePanelContext, useThemeDark } from '../context/AppContext'
import { getStaticProps } from '../pages'
import { useState } from 'react'
import theme from '../styles/theme.module.css'

export const siteTitle = 'Sebastian Kovacs'

export default function Layout({ children, title, sidePanelHeading, data }) {



    const [themeDark, setThemeDark] = useThemeDark();
    const [sidePanelState] = useSidePanelContext();

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

            {/* <Side
                heading={sidePanelHeading}
                title={title}
                data={data}
            /> */}


                <main className={`${sidePanelState ? styles.bodyOpen : styles.bodyClosed} ${themeDark ? theme.lightmode : theme.darkmode}`}>
                                {children}
                </main>






            {/* <Footer /> */}
        </>
    )
}

