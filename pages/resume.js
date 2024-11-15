import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/LayoutFilter'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import gif from '../styles/gif.module.css'
import Side from '../components/Side'
import theme from '../styles/theme.module.css'
import { useThemeDark } from '../context/AppContext'
import { useEffect, useState } from 'react'

const title = "Resume"
const sidePanelHeading = "Write Up"


export default function Resume() {
    const [isMobile, setIsMobile ] = useState()
    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 768) {
            setIsMobile(true)
        }
    })


    let data = [
        <p>Hi my name is Sebastian</p>,
        <p>I am a Graduate Architect with about 3 years of architecture experience and about 1.5 years on the tools in commercial and residential construction.</p>,
        <p>My current goal is to gain registration as an architect. Im keen to just work hard, improve my design skills and become a good architect.</p>,
        
        <p className={utilStyles.bt2}>I enjoy surfing, running, playing piano and reading (non-fiction) - I love to be constantly learning and mentally stimulated...</p>,
    ]
    const [themeDark, setThemeDark] = useThemeDark();

    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            {!isMobile &&
                <Side
                    heading={"About Me"}
                    title={title}>
                    {data}

                </Side>
            }
            <div className={utilStyles.title}>
                <h1>Resume Summary</h1>
                <div className={`${utilStyles.buttons} ${utilStyles.pcOnly}  ${themeDark && theme.darkmodeSolid} ${themeDark && theme.darkBB1}`} >
                    <a href='/files/Resume-Sebastian-Kovacs-2022.pdf' download className={utilStyles.download}>Resume &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                    <a href='/files/Portfolio-Sebastian-Kovacs-2022.pdf' download className={utilStyles.download}>Portfolio (16mb) &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                </div>
            </div>

            <div className={`${utilStyles.mobileOnlyFlex}`}>
                <a href='/files/Resume-Sebastian-Kovacs-2022.pdf' download className={`${utilStyles.bb1} ${utilStyles.download} ${themeDark && theme.darkBB1}`}>Resume &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                <a href='/files/Portfolio-Sebastian-Kovacs-2022.pdf' download className={`${utilStyles.bb1} ${utilStyles.download} ${themeDark && theme.darkBB1}`}>Portfolio (16mb) &nbsp;<span class="material-symbols-outlined">file_download</span></a>
            </div>


            <div className={`${utilStyles.mobileResumeVideoBackgroundHeight} ${utilStyles.videoBackground}`}>
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


            <div className={` ${utilStyles.resume} ${themeDark && theme.darkmode}`} >
                <div className={utilStyles.list}>
                    <h2 id={themeDark && theme.darkText}>Relevant Work History</h2>
                    <ul>
                        <li>Side Jobs 2021 - Present</li>
                        <li>Jason Topic Architecture 2017-2020</li>
                        <li>Carpentry (Paul Hickson Builder) 2016-2017</li>
                        <li>Construction (North) 2015-2016</li>
                    </ul>
                </div>

                <div className={utilStyles.list} >
                    <h2 id={themeDark && theme.darkText}>Education / Qualifications</h2>
                    <ul>
                        <li>Masters Architecture - University of Newcastle July 2020 </li>
                    </ul>
                </div>

                <div className={utilStyles.list} >

                    <h2 id={themeDark && theme.darkText}>Software</h2>

                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${themeDark && theme.darkmode}`} id={themeDark && theme.darkmodeT}>
                        <h3 id={themeDark && theme.darkText}>Drafting / BIM</h3>
                        <ul>
                            <li>Revit (v2020)</li>
                            <li>Vectorworks (v2017-2021)</li>
                        </ul>
                    </div>

                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${themeDark && theme.darkmode}`} id={themeDark && theme.darkmodeT}>
                        <h3 id={themeDark && theme.darkText}> Rendering</h3>
                        <ul>
                            <li>Vray</li>
                            <li>Twinmotion </li>
                            <li>Lumion</li>
                        </ul>
                    </div>

                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${themeDark && theme.darkmode}`} id={themeDark && theme.darkmodeT}>
                        <h3 id={themeDark && theme.darkText}>Other</h3>
                        <ul>
                            <li>Adobe Photoshop</li>
                            <li>Adobe Illustrator </li>
                            <li>Adobe InDesign</li>
                            <li>Google Office Suite</li>
                        </ul>
                    </div>


                </div>

                <div className={utilStyles.list}>
                    <h2 id={themeDark && theme.darkText}>Other Skills / Proficiencies</h2>
                    <ul>
                        <li>Digital Marketing</li>
                        <li>B2B Sales</li>
                        <li>Web Development</li>
                        <li>Social Media Marketing</li>
                    </ul>
                </div>
                {isMobile && <div className={utilStyles.list}>
                    <h2 id={themeDark && theme.darkText}>About Me</h2>
                    {data}
                </div>}

                <Link href={"/contact"}>
                    <a className={gif.fire} id={themeDark && theme.darkGIF}>

                        <div className={gif.text} id={themeDark && theme.darkGIF}>
                            {/* Lets Get Cooking... */}
                            Contact Me 👌
                        </div>

                        <div className={gif.friday} id={themeDark && theme.darkmodeT}><Image src={"/friday.gif"} alt={"frying pan cartoon"} layout="fill" objectFit='cover' objectPosition={"bottom"} priority="true" /></div>
                        <Image src={"/fire.gif"} alt={"wood fire cartoon"} layout="fill" objectFit='cover' objectPosition={"top"} priority="true" />
                    </a>
                </Link>
            </div>

        </Layout>

    )
}