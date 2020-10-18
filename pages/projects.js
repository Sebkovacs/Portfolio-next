import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import cards from '../styles/cards.module.css'
import { getProjectsData } from '../lib/projects'
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
                {allProjectsData.map(({ id, date, title, type, status, summary }) => (
                    <div className={cards.projectcard} key={id}>
                        <Link href={`/posts/${id}`}>
                            <a>{title}</a>
                        </Link>
                    <br />
                    <small className={utilStyles.lightText}>
                        <Date dateString={date} />
                    </small>
                    <p className={utilStyles.lightText}>"Type: "{type}" | Status: " {status}</p>
                    <p>{summary}</p>
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
