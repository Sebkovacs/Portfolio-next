import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { SRLWrapper } from "simple-react-lightbox";

import Layout, { siteTitle } from '../../components/LayoutSideOpen'
import Date from '../../components/Date'
import BackButton from '../../components/BackButton'

import { getAllProjectIds, getProjectData } from '../../lib/projects'

import utilStyles from '../../styles/utils.module.css'
import projects from '../../styles/projects.module.css'


const options = {
    progressBar: {
        showProgressBar: false
    },
    settings: {
        hideControlsAfter: 2000,
        boxShadow: 'none',
        disablePanzoom: true,

    },
    buttons: {
        showAutoplayButton: false,
        showDownloadButton: false,
        showThumbnailsButton: true,
    },
    caption: {
        showCaption: false,


    }
};



export default function Project({ projectData }) {
    let pano = false;
    if (projectData.pano == 'yes') {
        pano = true
    };

    


    return (
        <Layout>
            <Head>
                <title>{siteTitle}: {' '} {projectData.title}</title>
            </Head>
            <div className={projects.top} id="top"/>
            <div className={projects.details} >
                <h1 className={projects.title}>{projectData.title}</h1>
                {/* Mobile Only Header Image */}
                <div className={utilStyles.mobileOnly}>
                    <div className={projects.pic} >
                        <Image
                            src={`/projects/${projectData.shortTitle}${projectData.thumb}`}
                            alt={projectData.thumbAlt}
                            layout="fill"
                            objectFit="cover"
                            priority="true"
                        />
                    </div>
                </div>
                <div className={projects.detailsContainer}>
                    <div className={projects.linkContainer}>
                        <a className={`${projects.pano} ${utilStyles.bb1} ${utilStyles.back}`} href="#images">Images</a>
                        <a className={`${projects.pano} ${utilStyles.bb1} ${utilStyles.back}`} href="#plans">Plans</a>
                        <Link href={projectData.panoLink}>
                            <a target="_blank" style={{ display: pano ? "block" : "none" }} className={`${projects.pano} ${utilStyles.bb1} ${utilStyles.back}`}>3D Tour ↗</a>
                        </Link>
                    </div>
                    <div className={projects.projDetails}>
                        <h3>Project Details</h3>
                        <ul>

                            <li>Type: {projectData.type}</li>
                            <li>Worked On: {projectData.work}</li>
                            <li>Status: {projectData.status}</li>
                            <li>Location: {projectData.location}</li>
                            <li>Company: {projectData.company}</li>
                            <li>Software: {projectData.software}</li>
                            <li>Rendering: {projectData.rendering}</li>

                            {/* <li><Date dateString={projectData.date} /></li> */}

                        </ul>
                    </div>

                    {/* main write up */}
                    <h3>Overview</h3>
                    <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
                    <div className={utilStyles.pcOnly}>
                    <BackButton
                        link="/"
                        where="Projects"
                    />
                    </div>
                </div>
            </div>

            <div className={projects.main}>
                <SRLWrapper options={options}>
                    <div id="images" className={projects.imageWrap}>
                        {projectData.pics.map((pic) => 
                        <div className={pic.id == 1 ? `${projects.pic} ${utilStyles.pcOnly}` : projects.pic} key={pic.id}>
                            <Image
                                src={`/projects/${projectData.shortTitle}${pic.image}`}
                                alt={pic.alt}
                                layout="fill"
                                objectFit="cover"
                                priority={pic.id < 3 ? true : false}
                            />
                        </div>
                        )}
                    </div >

                    <div id="plans" className={projects.planWrap}>
                    {projectData.plans.map((plan) => 
                        <div key={plan.id} className={projects.plan}>
                            <Image
                                src={`/projects/${projectData.shortTitle}${plan.plan}`}
                                alt={plan.alt}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        )}
                    </div>

                </SRLWrapper>
                <div className={`${utilStyles.mobileOnlyFlex} ${utilStyles.flex2}`}>
                    <BackButton
                        link="/"
                        where="Projects"
                    />
                    <div className={`${utilStyles.mobileOnlyFlex} ${utilStyles.top} ${utilStyles.bt1} ${utilStyles.bb1}`}>
                        <a href="#top">Top ↑</a>
                    </div>
            </div>
            </div >



        </Layout >
    )
}

export async function getStaticPaths() {
    const paths = getAllProjectIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const projectData = await getProjectData(params.id)
    return {
        props: {
            projectData
        }
    }
}