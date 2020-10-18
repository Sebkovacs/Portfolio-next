import Link from 'next/link'
import styles from '../styles/utils.module.css'

export default function BackProjects(){
   return(
        <div className={styles.backToHome}>
            <Link href="/projects">
                <a>← Back to Projects</a>
            </Link>
        </div>
   ) 
}



