import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import gif from '../styles/gif.module.css'

const title = "Contact"

export default function Contact() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>

            <div className={utilStyles.title}>
                <h1>{title}</h1>
            </div>


            <div className={utilStyles.videoBackground}>
                <div className={utilStyles.backgroundCover} />
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload>
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload>
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload>
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload>
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload>
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload>
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload>
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload>
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
            </div>

            {/* <div className={gif.party}> */}

            <div className={utilStyles.contact}>
                <div className={gif.talk}><Image src={"/talk.gif"} layout="fill" objectFit='cover' priority="true"></Image></div>
                <div className={gif.happyblue}><Image src={"/happyblue.gif"} layout="fill" objectFit='cover' priority="true" /></div>
                <h2 className={`${utilStyles.grow} ${utilStyles.mb1} ${utilStyles.center} ${utilStyles.noPad}`}>Sebastian Kovacs</h2>
                <p>Phone: <br className={utilStyles.mobileOnly} /> <a href="tel:+61432365389">0432 365 389</a></p>
                <p>Email: <br className={utilStyles.mobileOnly} /><a className={utilStyles.lowerCase} href="mailto: sebkovacs@gmail.com">sebkovacs@gmail.com</a></p>
                <div className={utilStyles.address}>
                    <h4>Address:</h4>
                    <p>9/5 Dawson St<br /> Cooks Hill, NSW 2300<br /> Australia</p>
                </div>
                <Link href={"/"}>
                <a id={utilStyles.indexContact}/>
                    {/* <a className={utilStyles.indexContact}>
                        <Image
                            src={"/sebastian-kovacs-portfolio.png"}
                            alt={"sebastian Kovacs Icon Contact Link"}
                            layout="fill"
                            objectFit="cover"
                        />
                    </a> */}
                </Link>
            </div>

        </Layout>

    )
}