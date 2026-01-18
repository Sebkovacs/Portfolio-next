import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/LayoutFilter'
import { getSortedProjectsData } from '../lib/projects'
import cards from '../styles/cards.module.css'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import { useSidePanelContext, useThemeDark } from '../context/AppContext'
import Side from '../components/Side'
import SidePanelRight from '../components/SidePanelRight'
import filters from '../styles/filters.module.css'
import SEO from '../components/SEO'
import { useEffect, useState } from 'react'

const title = "Projects";
const sidePanelHeading = "Project List"




export default function Projects({ allProjectsData }) {

    const [isMobile, setIsMobile ] = useState(false)
    useEffect(() => {
        const windowWidth = window.innerWidth
        setIsMobile(windowWidth <= 768)
    }, [])

    const [themeDark, setThemeDark] = useThemeDark();
    const [sidePanelState, setSidePanelState] = useSidePanelContext();

    function themeToggle() {
        setThemeDark(prevThemeState => !prevThemeState)
    }
    function sidePanelToggle() {
        setSidePanelState(prevSidePanelState => !prevSidePanelState)
    }
    const projects = allProjectsData;

    // sorted Project List
    const data = projects.sort(function (a, b) { if (a.date > b.date) return -1; if (a.date < b.date) return 1; return 0; });

    // simple filter chips (type/status/software)
    const allTypes = Array.from(new Set(data.map(p => p.type).filter(Boolean)))
    const allStatus = Array.from(new Set(data.map(p => p.status).filter(Boolean)))
    const allSoftware = Array.from(new Set(data.map(p => p.software).filter(Boolean)))
    const [filtersActive, setFiltersActive] = useState([])
    function toggleFilter(id) {
        setFiltersActive(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }
    function clearFilters() { setFiltersActive([]) }
    const filtered = filtersActive.length === 0
        ? data
        : data.filter(p => [p.type, p.status, p.software].some(v => filtersActive.includes(v)))



    return (
        <Layout title={title} sidePanelHeading={sidePanelHeading} data={data}>
            <SEO title={`${siteTitle} | ${title}`} description="Selected architecture and design projects by Sebastian Kovacs." />
            {!isMobile &&
                <Side
                    heading={"Project List"}
                    title={title}
                    data={data} />
            }



            <div className={utilStyles.title}>
                <h1>{title}</h1>
            </div>
            {/* Filter chips */}
            <div className={utilStyles.chipsRow}>
                {[...allTypes, ...allStatus, ...allSoftware].map((id) => (
                    <button key={id} className={`${filters.tag} ${utilStyles.chip}`}
                        aria-pressed={filtersActive.includes(id)} onClick={() => toggleFilter(id)}>{id}</button>
                ))}
                {filtersActive.length > 0 && (
                    <button className={`${filters.tag} ${utilStyles.chip}`} onClick={clearFilters}>Reset</button>
                )}
            </div>
            <div className={cards.cardWrap} id="cardWrap">
                {filtered.map(({ id, title, shortTitle, type, status, thumb, thumbAlt }) => (
                    <Link key={id} href={`/projects/${id}`}>
                        <a className={` ${cards.card}`}>
                            <Image
                                src={`/projects/${shortTitle}${thumb}`}
                                alt={thumbAlt}
                                layout="fill"
                                objectFit="cover"
                            />
                            <div className={cards.title}>

                                <h2>{title}</h2>
                                <p className={`${cards.details}`} >{type} | {status}</p>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>



        </Layout>

    )
}

export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData()
    return {
        props: {
            allProjectsData
        }
    }
}
