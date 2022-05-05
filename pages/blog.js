import Head from 'next/head'
import LayoutFilter, { siteTitle } from '../components/LayoutFilter'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/Date'

let title = "Blog"

export default function Blog({ allPostsData }) {
  return (
    <LayoutFilter>
        <Head>
          <title>{siteTitle} {' | '} {title}</title>
        </Head>

        <div className={utilStyles.title}>
            <h1>{title}</h1>
            </div>
        <div className={utilStyles.padding}>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </div>
    </LayoutFilter>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}