import { useState, useEffect } from "react";
import { debounce } from '../utilities/helpers';
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'



const Navbar = ({children}) => {
    // New:
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    
    // debounce wrapper added:
    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 150) || currentScrollPos < 20);

        setPrevScrollPos(currentScrollPos);
            // timer set to 100 milliseconds:
    }, 10);

    useEffect (() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [prevScrollPos, visible, handleScroll]);

    return (
        <div className={`${styles.header} ${utilStyles.bb1}`} style={{ top: visible? '0' : "calc(var(--headerHeight) * -1)"}}>
            {children}
        </div>
    );
};

export default Navbar;

