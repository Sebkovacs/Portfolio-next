import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import { getSortedProjectsData } from '../lib/projects'
import cards from '../styles/cards.module.css'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import gif from '../styles/gif.module.css'




const title = "Projects";



export default function Projects({ allProjectsData }) {

    const projects = allProjectsData;
    
    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            <div className={utilStyles.title}>
            <h1>{title}</h1>
            </div>
            <div className={cards.cardWrap} id="cardWrap">
                {projects.map(({ id, title, shortTitle, type, status, thumb, thumbAlt }) => (
                    <Link key={id} href={`/projects/${id}`}>
                        <a className={cards.card} >
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

            <Link href={"/contact"}> 
                <a 
                // id={gif.skIcon}
                className={gif.cash}
                >
                            <Image src={"/sebastian-kovacs-portfolio.png"} height={50} width={50}/>
   
                </a>
            </Link>


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
