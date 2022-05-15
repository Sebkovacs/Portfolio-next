import { useState } from "react";

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Filters ({filters, setFilters}) {
    const types = ["Residential", "Mult-Residential", "Commercial", "Education", "Health"]
    const status = ["constructed", "In Construction", "DA", "CC", "Concept"]
    const software = ["revit", "vectorworks", "twinmotion", "rhino", "lumion", "archiCAD"]

    
    const modFilters = e => {
        if (!filters.includes(e.target.id)) {
            filters.push(e.target.id)
            // console.log(filters, `${e.target.id} was added`)
        } else {
            let index = filters.indexOf(e.target.id);
            filters.splice(index,1);
            // console.log(filters, `${e.target.id} was removed`)
        }
        setFilters([...filters]);
    };
    


    return (
        <div className={styles.filterContainer}>

        <small>Filters</small>
        <div className={styles.filters} >
            {filters.map((filter) => <div className={styles.filter} id={filter} onClick={modFilters}>{filter}</div>)}
        </div>

        {/* <div className={utilStyles.bb1} /> */}

        <small>Tags</small>
        <details><summary>Type</summary>
            <div className={styles.tags}>
                {types.map((type) => <div className={styles.tag} id={type} onClick={modFilters}>{type}</div>)}
            </div>
        </details>
        <details><summary>Status</summary>
            <div className={styles.tags}>
                {status.map((status) => <div className={styles.tag} id={status} onClick={modFilters}>{status}</div>)}
            </div>
        </details>
        <details><summary>Software</summary>
            <div className={styles.tags}>
                {software.map((software) => <div className={styles.tag} id={software} onClick={modFilters}>{software}</div>)}
            </div>
        </details>
        </div>
    )
}