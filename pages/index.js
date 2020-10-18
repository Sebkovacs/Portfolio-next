import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}: {' '} Home</title>
      </Head>
      
      <header>
        <h1>Home Page</h1>
      </header>

      <section className={utilStyles.headingMd}>
        <p>Welcome to the beginning of the website.</p>
        <p>
          The idea behind this website to collate some really 
          interesting ideas and practice web development skills at the same time.
        </p>
      </section>
    </Layout>
  )
}
