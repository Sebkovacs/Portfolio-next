import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Products (){
    return (
        <Layout>
                <Head>
                <title>{siteTitle}: {' '} Products</title>
                </Head>

                <header>
                    <h1>Product Page</h1>
                </header>

                <main>

                </main>
        </Layout>

    )
}