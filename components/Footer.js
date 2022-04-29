import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className={utilStyles.bt1}>
            <p  className={utilStyles.lightText}>
            sebastian kovacs 2022
            </p>
        </footer>
    )
}