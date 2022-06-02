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


            <div className={utilStyles.videoBackgroundContact}>
                <div className={utilStyles.backgroundCover} />
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload="true">
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload="true">
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload="true">
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload="true">
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload="true">
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload="true">
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload="true">
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
                <video style={{ flex: 1 }} width={"400vw"} autoplay="true" loop preload="true">
                    <source src="/party.mp4"
                        type="video/mp4" />
                </video>
            </div>

            {/* <div className={gif.party}> */}

            <div className={utilStyles.contact}>
                <div className={gif.talk}><Image src={"/talk.gif"} alt={"Lets Talk Call me speech bubble"} layout="fill" objectFit='cover' priority="true"></Image></div>
                <div className={gif.happyblue}><Image src={"/happyblue.gif"} alt={"happy blue cartoon saying lets talk"} layout="fill" objectFit='cover' priority="true" /></div>
                <h2 className={`${utilStyles.grow} ${utilStyles.mb1} ${utilStyles.center} ${utilStyles.noPad}`}>Sebastian Kovacs</h2>
                
                
                <div >
                    <h3 className={`${utilStyles.font2} ${utilStyles.flexLeft }`} >Phone: <br className={utilStyles.mobileOnly} /> <a className={utilStyles.flexLeft } href="tel:+61432365389">0432 365 389</a></h3>
                </div>
                <div>
                    <h3 className={`${utilStyles.font2} ${utilStyles.flexLeft }`} >Email: <br className={utilStyles.mobileOnly} /><a className={`${utilStyles.lowerCase} ${utilStyles.flexLeft }`} href="mailto: sebkovacs@gmail.com">sebkovacs@gmail.com</a></h3>
                </div>
                
                <div className={utilStyles.address}>
                    <h3 style={{fontSize: "1rem", fontWeight: 400}}>Address:</h3>
                    <p>9/5 Dawson St<br /> Cooks Hill, NSW 2300<br /> Australia</p>
                </div>
                <Link href={"/"}>
                <a id={utilStyles.indexContact}>Navigate to Home Page</a>
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
            <div className={utilStyles.credit }>
                <p>2022 | Website developed by me</p>
            </div>
        </Layout>

    )
}