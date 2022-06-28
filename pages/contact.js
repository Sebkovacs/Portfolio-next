import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/LayoutFilter'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import gif from '../styles/gif.module.css'
import { useRouter } from 'next/router'
import Side from '../components/Side'
import theme from '../styles/theme.module.css'
import { useThemeDark } from '../context/AppContext'
import { useEffect, useState } from 'react'

const title = "Contact"
const sidePanelHeading = "Social Links"

export default function Contact() {
    const [isMobile, setIsMobile ] = useState()
    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 768) {
            setIsMobile(true)
        }
    })

    let data = [{
        id: "Linkedin",
        link: "https://www.linkedin.com/in/sebastiankovacs/",
        logo: "https://www.cclhd.health.nsw.gov.au/wp-content/uploads/square-linkedin-512.png"
        // }, {
        //     id: "Instagram", 
        //     link: "https://www.instagram.com/kovacsseb/",
        //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
        // }, {
        //     id: "GitHub", 
        //     link: "https://github.com/Sebkovacs",
        //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png"
        // }, {
        //     id: "Twitter", 
        //     link: "https://twitter.com/Sebastiankovac5",
        //     logo: "logos/Twitter social icons - rounded square - blue.png"
        // }, {
        //     id: "YouTube", 
        //     link: "https://www.youtube.com/channel/UCFdiNiCD4bDICH0kwf-hX8w",
        //     logo: "logos/youtube_social_squircle_red.png"

    }]

    const router = useRouter()
    const [themeDark, setThemeDark] = useThemeDark();

    return (
        <Layout title={title} sidePanelHeading={sidePanelHeading} data={data}>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            {!isMobile &&
                <Side
                    heading={"Social Links"}
                    title={title}>
                    {data.map((e) =>
                        <Link href={e.link}>
                            <a target="_blank" className={utilStyles.link} style={{ display: 'flex', alignItems: "center", justifyContent: "flex-start", padding: ".5rem", borderRadius: ".5rem" }} id={e.id}>
                                <img src={e.logo} height={50} width={50} style={{ marginRight: "1rem" }} />
                                {e.id}
                            </a>
                        </Link>)}
                </Side>
            }
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

            <div className={` ${themeDark && theme.darkShadow} ${utilStyles.contact}`} id={themeDark && theme.darkGradShadow}>
                <div className={gif.talk} id={themeDark && theme.darkmodeT}><Image src={"/talk.gif"} alt={"Lets Talk Call me speech bubble"} layout="fill" objectFit='cover' priority="true"></Image></div>
                <div className={gif.happyblue} id={themeDark && theme.darkmodeT}><Image src={"/happyblue.gif"} alt={"happy blue cartoon saying lets talk"} layout="fill" objectFit='cover' priority="true" /></div>
                <h2 className={`${utilStyles.grow} ${utilStyles.mb1} ${utilStyles.center} ${utilStyles.noPad}`} style={{color: themeDark && "var(--border1)", textDecorationColor: themeDark && "var(--t1)", textUnderlineOffset: ".1em"}}>Sebastian Kovacs</h2>

                <div id={themeDark && theme.darkmodeHover}>
                    <h3 className={`${utilStyles.font2} ${utilStyles.flexLeft}`}>Phone: <br className={utilStyles.mobileOnly} /> <a className={utilStyles.flexLeft} href="tel:+61432365389">0432 365 389</a></h3>
                </div>
                <div id={themeDark && theme.darkmodeHover}>
                    <h3 className={`${utilStyles.font2} ${utilStyles.flexLeft}`}>Email: <br className={utilStyles.mobileOnly} /><a className={`${utilStyles.lowerCase} ${utilStyles.flexLeft}`} href="mailto: sebkovacs@gmail.com">sebkovacs@gmail.com</a></h3>
                </div>

                <div className={utilStyles.address} id={themeDark && theme.darkmodeHover} >
                    <h3 style={{ fontSize: "1rem", fontWeight: 500 }}>Address:</h3>
                    <p>9/5 Dawson St<br /> Cooks Hill, NSW 2300<br /> Australia</p>
                </div>
                {/* <Link href={"/"}>
                <a id={utilStyles.indexContact}>Navigate to Home Page</a>
                </Link> */}
                {isMobile &&

                    data.map((e) =>
                        <Link href={e.link}>
                            <a target="_blank" className={utilStyles.link2} style={{ display: 'flex', alignItems: "center", justifyContent: "flex-start", padding: ".5rem", borderRadius: ".5rem", fontSize: ".7rem", width: "fit-content", margin: "1rem", textTransform: "capitalize" }} id={e.id}>
                                <img src={e.logo} height={20} width={20} style={{ marginRight: ".5rem" }} />
                                {e.id}
                            </a>
                        </Link>)
                }
                <button id={utilStyles.indexContact} type="button" onClick={() => router.back()}>
                    Click here to go back
                </button>

            </div>
            <div className={`${utilStyles.credit} ${themeDark && theme.darkmode}`} style={{backgroundColor: themeDark ? !isMobile && "var(--s2)" : isMobile && "none"}}>
                <p style={{color: themeDark && "var(--border1)"}}>2022 | Website developed by me</p>
            </div>
        </Layout>

    )
}