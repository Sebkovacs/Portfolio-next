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


      {/* Blog Content Here */}
      <div className={blog.main}>

      
      <h1>{postData.title}</h1>
      <div  dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <div className={utilStyles.mobileOnly}>
        <ButtonBack
          link="/blog"
          where="Blog"
        />
      </div>
      </div>

      <div className={blog.tableOfContents}>
      <div>
        <p className={utilStyles.bb1}>Category: {postData.category}</p>
        <p className={utilStyles.bb1}>Date Updated: <Date dateString={postData.date} /></p>
        <span>Table of Contents</span>
        <ol>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ol>
        </div>
        <div className={utilStyles.pcOnly}>
          <ButtonBack
            link="/blog"
            where="Blog"
          />
        </div>
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
