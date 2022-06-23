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
import theme from '../styles/theme.module.css'

const title = "Projects";
const sidePanelHeading = "Project List"

export default function Projects({ allProjectsData }) {

    const [themeDark, setThemeDark] = useThemeDark();
    const [sidePanelState, setSidePanelState] = useSidePanelContext();

    function themeToggle() {
        setThemeState(prevThemeState => !prevThemeState)
    }
    function sidePanelToggle() {
        setSidePanelState(prevSidePanelState => !prevSidePanelState)
    }
    const projects = allProjectsData;

    // sorted Project List
    const data = projects.sort(function (a, b) { if (a.date > b.date) return -1; if (a.date < b.date) return 1; return 0; });
    
    let pageTitle = title.toLowerCase();

    return (
        <Layout title={title} sidePanelHeading={sidePanelHeading} data={data}>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            <Side
            heading={"Project List"}
            title={title}
            data={data}/>
                

            
            <div className={utilStyles.title}>
                <h1>{title}</h1>
            </div>
            <div className={cards.cardWrap} id="cardWrap">
                {projects.map(({ id, title, shortTitle, type, status, thumb, thumbAlt }) => (
                    <Link key={id} href={`/projects/${id}`}>
                        <a className={` ${cards.card}`} id={themeDark && theme.darkmode}>
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
