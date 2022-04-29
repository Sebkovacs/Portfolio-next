import Link from 'next/link'
import styles from '../styles/utils.module.css'

export default function BackProjects(){
   return(
            <Link href="/">
                <a className={`${styles.back} ${styles.bt1}`}>← Back to Projects</a>
            </Link>
   ) 
}



