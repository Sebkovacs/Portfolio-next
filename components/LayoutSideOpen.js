import Head from 'next/head'
import styles from './layout.module.css'
import Header from './Header'
import HoverTop from './HoverTop'
import Footer from './Footer'
import { useState } from "react";


export const siteTitle = 'SK'


export default function Layout({ children, title}) {

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

                <main className={styles.body}>
                    {children}
                    <HoverTop/>
                </main>
            </div>

            {/* <Footer /> */}

       </>
    )
}