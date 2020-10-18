import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import cards from '../styles/cards.module.css'
import { getSortedProjectsData } from '../lib/projects'
import Link from 'next/link'
import Date from '../components/date'

export default function Projects( { allProjectsData } ){
    return (
        <Layout>
                <Head>
                <title>{siteTitle}: {' '} Projects</title>
                </Head>

                <header>
                    <h1>Projects</h1>
                </header>

                <main className={cards.projectcards}>
                {allProjectsData.map(({ id, date, title, type, status, summary, thumb}) => (
                    <div className={cards.projectcard} key={id}>
                        <img src={thumb} alt={title}></img>
                        <div className={cards.infobox}>
                            <Link href={`/projects/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <p className={cards.details}>Type: {type} | Status: {status}<br /> Date: <Date dateString={date} /></p>
                            <p className={cards.description}>{summary}</p>
                        </div>
                    </div>
                    ))}
                </main>
        </Layout>

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
