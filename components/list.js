import utilStyles from '../styles/utils.module.css'
import { getSortedProjectsData } from '../lib/projects'
import Link from 'next/link'

export default function Lists( { allProjectsData } ){
    return (
        <div className={utilStyles.drop}>
        <h2>Hover</h2>
        <ul className={utilStyles.dropcontent}>
            {allProjectsData.map(({ id, title}) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/projects/${id}`}>
                <a>{title}</a>
            </Link>
            </li>
            ))}
        </ul>
    </div>

    )
}

export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData()
    return {
      props: {
        allProjectsData
      }
    }
  }
