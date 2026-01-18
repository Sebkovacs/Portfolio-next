import styles from './layout.module.css'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import { useState } from 'react'
// Theme handled via CSS variables on :root[data-theme]
import { useThemeDark } from '../context/AppContext'

export default function Layout() {
    const [themeDark, setThemeDark] = useThemeDark();
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    function toggleNav() { setMobileNavOpen(!mobileNavOpen) }

    function themeToggle() {
        setThemeDark(prevThemeState => !prevThemeState)
    }
    return (
        <header className={styles.background}>

            {/* PC Header & Nav */}

            <nav className={`${styles.header} ${utilStyles.bb1} ${utilStyles.pcOnly}`}>
                <div className={`${utilStyles.headerContainer} ${styles.headerWrap}`}>
                    <Link href="/">
                        <a className={styles.logo} >
                            Sebastian Kovacs | Architecture Portfolio
                        </a>
                    </Link>
                    <div>
                        <Link href="/"><a className={styles.navitem}>Projects</a></Link>
                        <Link href="/gallery"><a className={styles.navitem}>Gallery</a></Link>
                        {/* <Link href="/blog"><a className={styles.navitem}>Blog</a></Link> */}
                        <Link href="/resume"><a className={styles.navitem}>Resume</a></Link>
                        <Link href="/contact"><a className={styles.navitem}>Contact</a></Link>
                        <button aria-label="Toggle theme" onClick={themeToggle} className={styles.navitem} style={{ background:'transparent', border:'none', cursor:'pointer' }}>
                            <span className="material-symbols-outlined">{themeDark ? 'dark_mode' : 'light_mode'}</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Header & Nav */}

            <nav className={utilStyles.mobileOnly}>
                {/* <Navbar> */}
                <div className={`${styles.header} ${utilStyles.bb1}`}>
                    <div className={`${utilStyles.headerContainer} ${styles.headerWrap} `}>
                        <Link href="/">
                            <a className={`${styles.logo} `}>
                                Sebastian Kovacs <br /> Architecture Portfolio
                            </a>
                        </Link>
                        <div onClick={toggleNav} className={styles.navToggle}>
                            <span className="material-symbols-outlined"> 
                                menu
                            </span>
                        </div>
                    </div>
                </div>

                {/* </Navbar> */}

                <Link href="/"><a className={styles.navitem}>Projects</a></Link>
                <Link href="/gallery"><a className={styles.navitem}>Gallery</a></Link>
                {/* <Link href="/blog"><a className={styles.navitem}>Blog</a></Link> */}
                <Link href="/resume"><a className={styles.navitem}>Resume</a></Link>
                <Link href="/contact"><a className={styles.navitem}>Contact</a></Link>

                {/* </Mobile Side Navbar> */}
                <div className={styles.mobileNav} style={{left: mobileNavOpen && "0"}}>
                    <div onClick={toggleNav} className={styles.navToggle}>
                            <span className="material-symbols-outlined">
                            close
                            </span>
                        </div>
                    <div className={`${styles.headerWrap} ${utilStyles.bb1}`}><h1 className={styles.logo} >Menu</h1>
                    </div>
                    <ul>
                        <li><Link href="/"><a>Projects</a></Link></li>
                        <li><Link href="/gallery"><a>Gallery</a></Link></li>
                        {/* <li><Link href="/blog"><a>Blog</a></Link></li> */}
                        <li><Link href="/resume"><a>Resume</a></Link></li>
                        <li><Link href="/contact"><a>Contact</a></Link></li>

                        
                    </ul>
                <div className={` ${utilStyles.bt1} ${utilStyles.bottom}`}
                    onClick={themeToggle}>
                    {themeDark
                        ? <span className="material-symbols-outlined">dark_mode<p>Dark Mode</p></span>
                        : <span className="material-symbols-outlined">light_mode<p>Light Mode</p></span>}
                </div >
                </div>

            </nav>
        </header>
    )
}



