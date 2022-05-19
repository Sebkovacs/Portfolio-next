import styles from './layout.module.css'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import Navbar from './Navbar'


export default function Layout() {
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
                        {/* <Link href="/blog"><a className={styles.navitem}>Blog</a></Link> */}
                        <Link href="/resume"><a className={styles.navitem}>Resume</a></Link>
                        <Link href="/contact"><a className={styles.navitem}>Contact</a></Link>
                        <Link href="/gallery"><a className={styles.navitem}>Gallery</a></Link>
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

                    <label htmlFor={styles.toggle} className={`${styles.navToggle}`}>
                        {/* ☰ */}
                        <span class="material-symbols-outlined">
                            menu
                        </span>
                    </label>
                </div>
            </div>
            {/* </Navbar> */}
            
                <Link href="/"><a className={styles.navitem}>Projects</a></Link>
                {/* <Link href="/blog"><a className={styles.navitem}>Blog</a></Link> */}
                <Link href="/resume"><a className={styles.navitem}>Resume</a></Link>
                <Link href="/contact"><a className={styles.navitem}>Contact</a></Link>
                <Link href="/gallery"><a className={styles.navitem}>Gallery</a></Link>
                <input type={'checkbox'} id={styles.toggle} />
                <div className={styles.mobileNav}>
                    <label className={styles.navToggle} htmlFor={styles.toggle} >
                        {/* ✖ */}
                        <span class="material-symbols-outlined">
                            close
                        </span>
                    </label>
                    <div className={`${styles.headerWrap} ${utilStyles.bb2}`} ><h1 className={styles.logo}>Menu</h1>
                    </div>
                    <ul>
                        <li><Link href="/"><a>Projects</a></Link></li>
                        {/* <li><Link href="/blog"><a>Blog</a></Link></li> */}
                        <li><Link href="/resume"><a>Resume</a></Link></li>
                        <li><Link href="/contact"><a>Contact</a></Link></li>
                        <li><Link href="/gallery"><a>Gallery</a></Link></li>
                    </ul>
                </div>
                <label className={styles.black} htmlFor={styles.toggle}></label>
            </nav>
        </header>
    )
}



