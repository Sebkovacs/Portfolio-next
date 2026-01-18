import { useThemeDark } from '../context/AppContext';
import styles from '../styles/utils.module.css'

const link = "#top";
const where = "Top";

export default function TopButton({ link, where }) {
    const [themeDark] = useThemeDark();
    return (
            <a href={link} className={`${styles.top} ${styles.bt1}`}>
                 {where} &nbsp;
                 <span className="material-symbols-outlined">arrow_upward</span>
            </a>
    )
}



