import Link from 'next/link'
import styles from '../styles/utils.module.css'

export default function Back(){
   return(
        <div className={styles.backToHome}>
            <Link href="/blog">
                <a>← Back to Blog</a>
            </Link>
        </div>
   ) 
}



