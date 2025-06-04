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

const title = 'Resume'

export default function Resume () {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    /* -------------------------------------------------------------------------- */
    /*                           ABOUT & PERSONAL BLURB                           */
    /* -------------------------------------------------------------------------- */
    const aboutMe = [
        <p key='intro'>Hey — I’m <strong>Sebastian Kovacs</strong>, a Newcastle‑based Project Architect specialising in early‑phase <em>data‑centre</em> campuses and high‑end coastal homes.</p>,
        <p key='exp'>Across <strong>7 years in practice</strong> I’ve taken multiple hyperscale data‑centre projects from blank‑site due‑diligence through <abbr title='Concept Design'>Concept</abbr>, <abbr title='Development Application'>DA</abbr> and <abbr title='State Significant Development Application'>SSDA</abbr> submissions, while concurrently delivering bespoke residential retreats along the NSW coastline.</p>,
        <p key='goal'>I sit the <strong>APE</strong> in June 2025 and currently drive concept‑to‑approval strategy at <em>EJE Architecture</em>. My long‑game: location‑independent design leadership that funds surf‑chasing and a portfolio of tech & property ventures.</p>,
        <p key='life' className={utilStyles.bt2}>When I’m not finessing façade‑to‑rack clearances you’ll find me wrangling Next.js side‑projects, shooting sunrise surf sessions, or devouring books on strategy and neuro‑performance.</p>
    ]

    const [themeDark] = useThemeDark()

    return (
        <Layout>
            <Head>
                <title>{`${siteTitle} | ${title}`}</title>
            </Head>

            {!isMobile && (
                <Side heading='About Me' title={title}>
                    {aboutMe}
                </Side>
            )}

            {/* --------------------------------- HEADER --------------------------------- */}
            <header className={utilStyles.title}>
                <h1>Résumé Snapshot</h1>
                <div className={`${utilStyles.buttons} ${utilStyles.pcOnly} ${themeDark && theme.darkmodeSolid} ${themeDark && theme.darkBB1}`}>
                    <a href='/files/Resume-Sebastian-Kovacs-2025.pdf' download className={utilStyles.download}>
                        Resume <span className='material-symbols-outlined'>file_download</span>
                    </a>
                    <a href='/files/Portfolio-Sebastian-Kovacs-2025.pdf' download className={utilStyles.download}>
                        Portfolio (18 MB) <span className='material-symbols-outlined'>file_download</span>
                    </a>
                </div>
            </header>

            {/* --------------------------- MOBILE DOWNLOAD --------------------------- */}
            <div className={utilStyles.mobileOnlyFlex}>
                <a href='/files/Resume-Sebastian-Kovacs-2025.pdf' download className={`${utilStyles.bb1} ${utilStyles.download} ${themeDark && theme.darkBB1}`}>Resume <span className='material-symbols-outlined'>file_download</span></a>
                <a href='/files/Portfolio-Sebastian-Kovacs-2025.pdf' download className={`${utilStyles.bb1} ${utilStyles.download} ${themeDark && theme.darkBB1}`}>Portfolio (18 MB) <span className='material-symbols-outlined'>file_download</span></a>
            </div>

            {/* ------------------------------ HERO LOOP ------------------------------ */}
            <div className={`${utilStyles.mobileResumeVideoBackgroundHeight} ${utilStyles.videoBackground}`}>
                <div className={utilStyles.backgroundCover} />
                {[...Array(6)].map((_, i) => (
                    <video key={i} style={{ flex: 1 }} width='400vw' autoPlay loop muted playsInline preload='metadata'>
                        <source src='/party.mp4' type='video/mp4' />
                    </video>
                ))}
            </div>

            {/* --------------------------------- BODY --------------------------------- */}
            <main className={`${utilStyles.resume} ${themeDark && theme.darkmode}`}>
                {/* WORK HISTORY */}
                <section className={utilStyles.list}>
                    <h2 id={themeDark && theme.darkText}>Professional Experience</h2>
                    <ul>
                        <li>
                            <strong>EJE Architecture</strong> — Project Architect | 2022 - Present
                            <ul className={utilStyles.subList}>
                                <li>Design lead for a $550 m hyperscale data‑centre campus (80 MW) – stewarded Concept, DA & SSDA packs, coordinated with structural, electrical & fire teams, and secured gateway approvals on first submission.</li>
                                <li>Drove front‑end strategy on tier‑III/IV data‑centre rollouts across Sydney & Melbourne greenfield sites.</li>
                                <li>Guided clients through feasibility studies, yield optimisation & CAPEX modelling.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>SALT & STONE Architecture + Interiors</strong> — Co‑Founder / Design Lead | 2024 - Present
                            <ul className={utilStyles.subList}>
                                <li>Crafting high‑end coastal residences (A$1‐5 m) from vision through DA approval, weaving sustainability + sensory materiality.</li>
                                <li>Built client acquisition funnel & brand identity; landed first three projects within 60 days of launch.</li>
                            </ul>
                        </li>
                        <li>Freelance — NatHERS/BASIX Energy Assessor & Revit workflow consultant | 2021 - Present</li>
                        <li>Jason Topic Architecture — Graduate Architect | 2017 - 2020</li>
                        <li>Paul Hickson Builder — Carpenter | 2016 - 2017</li>
                        <li>North Constructions — Construction Labourer | 2015 - 2016</li>
                    </ul>
                </section>

                {/* EDUCATION */}
                <section className={utilStyles.list}>
                    <h2 id={themeDark && theme.darkText}>Education & Credentials</h2>
                    <ul>
                        <li>Master of Architecture — University of Newcastle | 2020</li>
                        <li>APE (NSW) — Candidate, sitting June 2025</li>
                        <li>NatHERS / BASIX Assessor — in progress, 2025</li>
                        <li>AWS Cloud Practitioner — in progress, 2025</li>
                    </ul>
                </section>

                {/* SOFTWARE*/}
                <section className={utilStyles.list}>
                    <h2 id={themeDark && theme.darkText}>Core Toolset</h2>
                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${themeDark && theme.darkmode}`}>
                        <h3 id={themeDark && theme.darkText}>BIM / Coordination</h3>
                        <ul>
                            <li>Revit 2025 (+ Dynamo & Generative Design)</li>
                            <li>Navisworks Manage 2024</li>
                            <li>Bluebeam Revu 21</li>
                        </ul>
                    </div>
                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${themeDark && theme.darkmode}`}>
                        <h3 id={themeDark && theme.darkText}>Visualisation</h3>
                        <ul>
                            <li>Unreal Engine 5.4</li>
                            <li>Twinmotion 2025</li>
                            <li>Enscape 4</li>
                            <li>V‑Ray 6</li>
                        </ul>
                    </div>
                    <div className={`${utilStyles.bt1} ${utilStyles.grid2} ${themeDark && theme.darkmode}`}>
                        <h3 id={themeDark && theme.darkText}>Dev / Misc</h3>
                        <ul>
                            <li>Next.js / React / TypeScript</li>
                            <li>Figma & FigJam</li>
                            <li>Adobe CC (PS, AI, ID)</li>
                            <li>AWS Amplify, S3</li>
                        </ul>
                    </div>
                </section>

                {/* SKILLS*/}
                <section className={utilStyles.list}>
                    <h2 id={themeDark && theme.darkText}>Hybrid Skill Stack</h2>
                    <ul>
                        <li>Data‑centre master‑planning & compliance navigation (NCC, SEPP, SSDA)</li>
                        <li>Concept storytelling & visual strategy for high‑net‑worth residential clients</li>
                        <li>Digital marketing funnels & Google Ads for design practices</li>
                        <li>Full‑stack web‑app prototyping (Next.js, Firebase, AWS)</li>
                        <li>NLP‑based performance coaching & transformational hypnosis</li>
                    </ul>
                </section>

                {/* MOBILE ABOUT */}
                {isMobile && (
                    <section className={utilStyles.list}>
                        <h2 id={themeDark && theme.darkText}>About Me</h2>
                        {aboutMe}
                    </section>
                )}

                {/* CTA */}
                <Link href='/contact'>
                    <a className={gif.fire} id={themeDark && theme.darkGIF}>
                        <div className={gif.text}>Contact Me 👌</div>
                        <div className={gif.friday} id={themeDark && theme.darkmodeT}>
                            <Image src='/friday.gif' alt='frying pan cartoon' layout='fill' objectFit='cover' objectPosition='bottom' priority />
                        </div>
                        <Image src='/fire.gif' alt='wood fire cartoon' layout='fill' objectFit='cover' objectPosition='top' priority />
                    </a>
                </Link>
            </main>
        </Layout>
    )
}
