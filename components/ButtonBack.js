import Link from 'next/link'
import styles from '../styles/utils.module.css'

const link = "/";
const where = "Home";


export default function BackButton({ link, where }) {
    return (
        <Link href={link}>
            <a className={`${styles.back} ${styles.bt1} ${styles.bb1}`}>
                <span class="material-symbols-outlined">arrow_back</span>
                &nbsp; Back to {where}

            </a>
        </Link>
    )
}



