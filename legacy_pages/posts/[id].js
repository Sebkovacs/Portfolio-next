import Head from 'next/head'

import Layout, { siteTitle } from '../../components/LayoutFilter'
import Date from '../../components/Date'
import ButtonBack from '../../components/ButtonBack'

import { getAllPostIds, getPostData } from '../../lib/posts'

import utilStyles from '../../styles/utils.module.css'
import blog from '../../styles/blog.module.css'
import Side from '../../components/Side'
import projects from '../../styles/projects.module.css'
import { useSidePanelContext, useThemeDark } from '../../context/AppContext'
import { useEffect, useState } from 'react'
import Link from 'next/link'


export default function Post({ postData }) {
  const [sidePanelState] = useSidePanelContext();
  let [tableOfContents, setTableOfContents] = useState([])
  useEffect(() => {
    let h2Headings = document.querySelectorAll("h2")
    let toc = []

    for (let i = 0; i < h2Headings.length; i++) {
      toc.push(h2Headings[i].textContent)
      h2Headings[i].setAttribute("id", `${h2Headings[i].textContent.replace(/\s/g, '-')}`);

    }
    setTableOfContents(tableOfContents = toc)
  }, [])


  const [isMobile, setIsMobile ] = useState()
  useEffect(() => {
      let windowWidth = window.innerWidth;
      if (windowWidth <= 768) {
          setIsMobile(true)
      }
  })




  return (
    <Layout>
      <Head>
        <title>{siteTitle}: {' '} {postData.title}</title>
      </Head>
      <Side
        title={postData.title}
        heading={"Table of Contents"}>

        <div className={projects.projDetails}>
          <h3>Details</h3>
          <ul >
            <li >Category: {postData.category}</li>
            <li >Date Updated: <Date dateString={postData.date} /></li>
          </ul>
        </div>
        <h3>Table of Contents</h3>
        <ol >
          {tableOfContents.map((e) =>
            <Link href={`/posts/${postData.title.toLowerCase().replace(/\s/g, '-')}#${e.replace(/\s/g, '-')}`}><a>
              <li className={blog.tocLink}>
                {e}
              </li>
            </a></Link>
          )}
        </ol>

        <div className={utilStyles.pcOnly} id={projects.bottom} style={{ opacity: !sidePanelState ? "0" : "1", transition: "1s" }}>
          <ButtonBack
            link="/blog"
            where="Blog"
          />
        </div>

      </Side>

      {/* Blog Content Here */}
      <div className={blog.main} style={{margin: !sidePanelState? "auto" : "0 10%"}}>


        <h1>{postData.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <div className={utilStyles.mobileOnly}>
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
