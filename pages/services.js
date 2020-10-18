import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Services(){
    return (
        <Layout>
                <Head>
                <title>{siteTitle}: {' '} Services</title>
                </Head>
            
                <main>
                    <h1>Services Pages</h1>
                    
                </main>
        </Layout>

    )
}