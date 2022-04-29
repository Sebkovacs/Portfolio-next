import styles from './layout.module.css'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'


export default function Layout() {  
    return (
            <header className={`${styles.header} ${utilStyles.bb1}`}>
                <div className={`${utilStyles.headerContainer} ${styles.headerWrap}`}>
                    <Link  href="/">
                        <a className={styles.logo}>
                        Sebastian Kovacs | Architecture Portfolio
                        </a>
                    </Link>

                    <nav>
                        <Link href="/"><a className={styles.navitem}>Projects</a></Link>
                        <Link href="/essays"><a className={styles.navitem}>Essays</a></Link>
                        <Link href="/resume"><a className={styles.navitem}>Resume</a></Link>
                        <Link href="/contact"><a className={styles.navitem}>Contact</a></Link>

                        <input type={'checkbox'} id={styles.toggle} />

                        <label htmlFor={styles.toggle} className={`${styles.navToggle}`}>☰</label>


                        <div className={styles.mobileNav}>
                                <label className={styles.navToggle} htmlFor={styles.toggle} >✖</label>
                            <div className={`${styles.headerWrap} ${utilStyles.bb2}`} >
                            </div>

                            <ul>
                            <li className={styles.mobileNavHeading}>Menu</li>
                                <li><Link href="/"><a>Projects</a></Link></li>
                                <details ><summary>Projects</summary>
                                <ul className={styles.details}>
                                    <li><Link href="/projects"><a>top 1</a></Link></li>
                                    <li><Link href="/projects"><a>top 1</a></Link></li>
                                    <li><Link href="/projects"><a>top 1</a></Link></li>
                                    <li><Link href="/projects"><a>top 1</a></Link></li>
                                </ul>
                                </details>
                                <li><Link href="/essays"><a>Essays</a></Link></li>
                                <li><Link href="/resume"><a>Resume</a></Link></li>
                                <li><Link href="/contact"><a>Contact</a></Link></li>
                            </ul>
                        </div>
                        <label className={styles.black} htmlFor={styles.toggle}></label>

                    </nav>
                </div>
            </header>
    )
}



