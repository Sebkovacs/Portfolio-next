import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Rapotors'
export const siteTitle = 'Rapotors'

export default function Layout({ children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/rapotors-favicon.png" />
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
            <div className={styles.headbar}>
                <header className={styles.header}>
                    {home ? (
                        <>
                        <img
                            src="/images/tenor.gif"
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <p className={styles.heading}>{name}</p>
                        </>
                    ) : (
                        <>
                        <Link href="/">
                            <a>
                            <img
                            src="/images/tenor.gif"
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                            />
                            </a>
                        </Link>
                        <p className={styles.heading}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </p>
                        </>
                    )}
                </header>
                <nav className={styles.nav}>
                    <Link href="/"><a className={styles.navitem}>Home</a></Link>
                    <Link href="/projects"><a className={styles.navitem}>Projects</a></Link>
                    <Link href="/services"><a className={styles.navitem}>Services</a></Link>
                    <Link href="/blog"><a className={styles.navitem}>Blog</a></Link>
                    <Link href="/about"><a className={styles.navitem}>About</a></Link>
                </nav>
            </div>

            <main>
                {children}
            </main>
       </div>
    )
}