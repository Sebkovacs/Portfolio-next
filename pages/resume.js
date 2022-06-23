import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/LayoutFilter'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import gif from '../styles/gif.module.css'
import Side from '../components/Side'
import theme from '../styles/theme.module.css'
import { useThemeDark } from '../context/AppContext'

const title = "Resume"
const sidePanelHeading = "Write Up"

export default function Resume() {
    let data = [
        "About me: something something blurb blurb"
    ]
    const [themeDark, setThemeDark] = useThemeDark();

    return (
        <Layout title={title} sidePanelHeading={sidePanelHeading} data={data}>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            <Side
            heading={"About"}
            title={title}>
            <p>Hi my name is Sebastian</p>
            <p>I am a Graduate Architect with about 3 years of architecture experience and about 1.5 years on the tools in commercial and residential construction.</p>
            <p>My medium term goal is to work hard and improve my design skills and become a good architect.</p>
            <p>My long term goal is to develop property where I can ensure really good quality. This would likely include exploring different set ups (equity / debt & tenure) similar to gruppenhaus projects in Europe.</p>
            <hr/>
            <p>I enjoy surfing, running, piano and reading - I need to be constantly learning and mentally stimulated...</p>

            </Side>

            <div className={utilStyles.title}>
                <h1>Resume Summary</h1>
                <div className={`${utilStyles.buttons} ${utilStyles.pcOnly}`}>
                    <a href='/files/Resume-Sebastian-Kovacs-2022.pdf' download className={utilStyles.download}>Resume &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                    <a href='/files/Portfolio-Sebastian-Kovacs-2022.pdf' download className={utilStyles.download}>Portfolio (16mb) &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                </div>
            </div>

            <div className={`${utilStyles.mobileOnlyFlex} `}>
                <a href='/files/Resume-Sebastian-Kovacs-2022.pdf' download className={`${utilStyles.bb1} ${utilStyles.download}`}>Resume &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                <a href='/files/Portfolio-Sebastian-Kovacs-2022.pdf' download className={`${utilStyles.bb1} ${utilStyles.download}`}>Portfolio (16mb) &nbsp;<span class="material-symbols-outlined">file_download</span></a>
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


            <div className={` ${utilStyles.resume} ${!themeDark && theme.darkmode}`} >
                <div className={utilStyles.list}>
                    <h2>Relevant Work History</h2>
                    <ul>
                        <li>Side Jobs 2021 - Present</li>
                        <li>Jason Topic Architecture 2017-2020</li>
                        <li>Carpentry (Paul Hickson Builder) 2016-2017</li>
                        <li>Construction (North) 2015-2016</li>
                    </ul>
                </div>

                <div className={utilStyles.list} >
                    <h2>Education / Qualifications</h2>
                    <ul>
                        <li>Masters Architecture - University of Newcastle July 2020 </li>
                    </ul>
                </div>

                <div className={utilStyles.list} >

                    <h2>Software</h2>

                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${!themeDark && theme.darkmode}`} id={!themeDark && theme.darkmodeT}>
                        <h3>Drafting / BIM</h3>
                        <ul>
                            <li>Revit (v2020)</li>
                            <li>Vectorworks (v2017-2021)</li>
                        </ul>
                    </div>

                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${!themeDark && theme.darkmode}`} id={!themeDark && theme.darkmodeT}>
                        <h3> Rendering</h3>
                        <ul>
                            <li>Vray</li>
                            <li>Twinmotion </li>
                            <li>Lumion</li>
                        </ul>
                    </div>

                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${!themeDark && theme.darkmode}`} id={!themeDark && theme.darkmodeT}>
                        <h3 >Other</h3>
                        <ul>
                            <li>Adobe Photoshop</li>
                            <li>Adobe Illustrator </li>
                            <li>Adobe InDesign</li>
                            <li>Google Office Suite</li>
                        </ul>
                    </div>


                </div>

                <div className={utilStyles.list}>
                    <h2>Other Skills / Proficiencies</h2>
                    <ul>
                        <li>Digital Marketing</li>
                        <li>B2B Sales</li>
                        <li>Web Development</li>
                        <li>Social Media Marketing</li>
                    </ul>
                </div>

                <Link href={"/contact"}>
                    <a className={gif.fire} id={!themeDark && theme.darkGIF}>

                        <div className={gif.text} id={!themeDark && theme.darkGIF}>
                            {/* Lets Get Cooking... */}
                            Contact Me 👌
                        </div>

                        <div className={gif.friday} id={!themeDark && theme.darkmodeT}><Image src={"/friday.gif"} alt={"frying pan cartoon"} layout="fill" objectFit='cover' objectPosition={"bottom"} priority="true" /></div>
                        <Image src={"/fire.gif"} alt={"wood fire cartoon"}  layout="fill" objectFit='cover' objectPosition={"top"} priority="true" />
                    </a>
                </Link>
            </div>

        </Layout>

    )
}