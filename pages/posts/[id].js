import Layout, { siteTitle } from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import BackEssays from '../../components/Back-essays'

export default function Post({ postData }) {
  return (
    <Layout>
        <Head>
            <title>{siteTitle}: {' '} {postData.title}</title>
        </Head>
        <section className={utilStyles.container}>
          <h1 className={utilStyles.postTitle}>{postData.title}</h1>
          <p className={utilStyles.lightText}>
          Writen: <Date dateString={postData.date} />
          </p>
          <div className={utilStyles.bt1} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <BackEssays />
        </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}