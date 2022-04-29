import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'

const title = "Contact"

export default function Contact(){
    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
                <h1>{title}</h1>


                <div className={utilStyles.padding}>
                    <h2>Sebastian Kovacs</h2>
                    <p>Phone: <a href="tel:+61432365389">0432 365 389</a></p>
                    <p>Email: <a href="mailto: sebkovacs@gmail.com">sebkovacs@gmail.com</a></p>
                    <p>9/5 Dawson St Cooks Hill, Australia</p>
                </div>

        </Layout>

    )
}