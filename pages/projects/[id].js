import Layout, { siteTitle } from '../../components/layout'
import { getAllProjectIds, getProjectData } from '../../lib/projects'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import BackProjects from '../../components/back-projects'

export default function Project( { projectData } ) {
    return(
        <Layout>
            <Head>
                <title>{siteTitle}: {' '} {projectData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={projectData.date} />
                </div>
                <div className={utilStyles.lightText}>"Type: "{type}" | Status: " {status}</div>
                <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
            </article>
            <BackProjects></BackProjects>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllProjectIds()
    return {
      paths,
      fallback: false
    }
  }
  
export async function getStaticProps({ params }) {
const projectData = await getProjectData(params.id)
    return {
        props: {
        projectData
        }
    }
}