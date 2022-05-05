import Head from 'next/head'

import Layout, { siteTitle } from '../../components/LayoutSideOpen'
import Date from '../../components/Date'
import ButtonBack from '../../components/ButtonBack'

import { getAllPostIds, getPostData } from '../../lib/posts'

import utilStyles from '../../styles/utils.module.css'
import blog from '../../styles/blog.module.css'


export default function Post({ postData }) {


  return (
    <Layout>
      <Head>
        <title>{siteTitle}: {' '} {postData.title}</title>
      </Head>

      <div className={blog.tc}>
        <h1 className={blog.title}>{postData.title}</h1>
        <div className={blog.tcContainer}>
          <div>
            <p className={`${utilStyles.lightText} ${utilStyles.bb1}`}>
              Updated: <Date dateString={postData.date} />
            </p>
            <h2>Table of Contents</h2>
            <ul>
              <li>Type: {postData.type}</li>
              <li>Worked on: {postData.work}</li>
              <li>Status: {postData.status}</li>
              <li>Company: {postData.company}</li>
              <li>Location: {postData.location}</li>
              <li>Software: {postData.software}</li>
            </ul>
          </div>
<div className={utilStyles.pcOnly}>
          <ButtonBack
            link="/blog"
            where="Blog"
          />
</div>
        </div>
      </div>
      
      {/* Blog Content Here */}
      <div className={blog.main} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
<div className={utilStyles.mobileOnly}>
          <ButtonBack
            link="/blog"
            where="Blog"
          />
</div>
    </Layout >
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
