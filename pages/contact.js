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

            <div className={utilStyles.title}>
            <h1>{title}</h1>
            </div>


                <div className={utilStyles.party}>
                    
                    <div className={utilStyles.list}>
                        <h2 className={`${utilStyles.grow} ${utilStyles.mb1} ${utilStyles.center} ${utilStyles.noPad}`}>Sebastian Kovacs</h2>
                        <p>Phone: <br className={utilStyles.mobileOnly}/> <a href="tel:+61432365389">0432 365 389</a></p>
                        <p>Email: <br className={utilStyles.mobileOnly}/><a className={utilStyles.lowerCase} href="mailto: sebkovacs@gmail.com">sebkovacs@gmail.com</a></p>
                        <div className={utilStyles.flex2}>
                        <h4>Address:</h4>
                        <p>9/5 Dawson St<br /> Cooks Hill, NSW 2300<br /> Australia</p>
                        </div>
                    </div>
                </div>

        </Layout>

    )
}