import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function About(){
    return (
        <Layout>
            <Head>
            <title>About Me</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <header>
                <h1>Blog Posts</h1>
            </header>
            
            <main>
                <h1>Hello ME</h1>
                <p>🧀🧀🧀🧀🧀🧀</p>

            </main>
        </Layout>

    )
}