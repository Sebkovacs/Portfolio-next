import Link from 'next/link'
import styles from '../styles/utils.module.css'

export default function BackEssays(){
   return(

            <Link href="/essays">
                <a className={styles.back}>← Back to Essays</a>
            </Link>

   ) 
}



