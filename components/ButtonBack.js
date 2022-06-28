import Link from 'next/link'
import styles from '../styles/utils.module.css'
import theme from '../styles/theme.module.css'
import { useThemeDark } from '../context/AppContext';


const link = "/";
const where = "Home";


export default function BackButton({ link, where }) {
    const [themeDark] = useThemeDark();
    return (
        <Link href={link}>
            <a className={`${styles.back} ${styles.bt1} `} id={themeDark && theme.darkmode}>
                <span class="material-symbols-outlined">arrow_back</span>
                &nbsp;{where}

            </a>
        </Link>
    )
}



