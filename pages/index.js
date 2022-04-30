import Head from 'next/head'
import Link from 'next/link'
import LayoutFilter, { siteTitle } from '../components/LayoutFilter'
import { getSortedProjectsData } from '../lib/projects'
import cards from '../styles/cards.module.css'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'



const title = "Projects"

export default function Projects({ allProjectsData }) {
    return (
        <LayoutFilter>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>

            <h1>{title}</h1>

            <div className={cards.cardWrap}>
                {allProjectsData.map(({ id, title, shortTitle, type, status, thumb, thumbAlt }) => (
                    <Link href={`/projects/${id}`}>
                        <a key={id} className={cards.card} >
                            <Image
                                src={`/projects/${shortTitle}${thumb}`}
                                alt={thumbAlt}
                                layout="fill"
                                objectFit="cover"
                            />
                            <div className={cards.title}>

                                <h2>{title}</h2>
                                <p className={cards.details}>{type} | {status}</p>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>


        </LayoutFilter>

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
