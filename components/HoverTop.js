import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

export default function HoverTop() {
    return (
        <Link href="#top"> 
                {/* <a className={utilStyles.hoverTop}> */}
        <a className={`${utilStyles.link} ${utilStyles.hoverTop}`}>
        <span class="material-symbols-outlined">
keyboard_double_arrow_up
</span>
        </a>
        </Link>
    )
}