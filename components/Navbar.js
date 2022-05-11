import { useState, useEffect } from "react";
import { debounce } from '../utilities/helpers';
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'



const Navbar = ({children}) => {
    // New:
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    // const navbarSytles = {
    //     position: 'fixed',
    //     height: "var(--headerHeight)",
    //     width: '100%',
    //     backgroundColor: 'grey',
    //     textAlign: 'center',
    //     transition: 'top 0.6s'
    // }

    // debounce wrapper added:
    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 150);

        setPrevScrollPos(currentScrollPos);
            // timer set to 100 milliseconds:
    }, 100);

    useEffect (() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [prevScrollPos, visible, handleScroll]);

    return (
        // <div style={{...navbarSytles, top: visible? '0' : `calc(var(--headerHeight) * -1)` }}>
        <div className={`${styles.header} ${utilStyles.bb1}`} style={{ top: visible? '0' : `calc(var(--headerHeight) * -1)` }}>
            {children}
        </div>
    );
};

export default Navbar;

