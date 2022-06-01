import Head from 'next/head'
import styles from './layout.module.css'
import Header from './Header'
import Footer from './Footer'

export const siteTitle = 'Sebastian Kovacs'


export default function Layout({ children, title}) {
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
            <aside className={styles.sideBarClosed }>
                    

                    <h1>Filter</h1>

            </aside>
            <main className={styles.bodyClosed}>
                {children}
            </main>

            {/* <Footer /> */}
       </>
    )
}
