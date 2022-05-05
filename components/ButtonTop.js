import styles from '../styles/utils.module.css'

const link = "#top";
const where = "Top";

export default function TopButton({ link, where }) {
    return (
            <a href={link} className={`${styles.top} ${styles.bt1} ${styles.bb1}`}>
                 Back to {where} &nbsp;
                 <span class="material-symbols-outlined">arrow_upward</span>
            </a>
    )
}



