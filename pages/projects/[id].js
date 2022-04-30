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
    }

    return (
        <Layout>
            <Head>
                <title>{siteTitle}: {' '} {projectData.title}</title>
            </Head>

            <div className={projects.details}>
                <h1 className={projects.title}>{projectData.title}</h1>


                {/* Mobile Only Header Image */}
                <div className={utilStyles.mobileOnly}>
                    <div className={projects.pic}>
                        <Image
                            src={`/media/projects/${projectData.shortTitle}${projectData.image1}`}
                            alt={projectData.imageAlt2}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>


                <div className={projects.detailsContainer}>
                    <Link href={projectData.panoLink}>
                        <a target="_blank" style={{ display: pano ? "block" : "none" }} className={`${projects.pano} ${utilStyles.bb1} ${utilStyles.back}`}>Pano Link →</a>
                    </Link>

                    <div className={projects.projDetails}>
                        <h3 >Project Details</h3>
                        <ul>
                            <li>Type: {projectData.type}</li>
                            <li>Worked on: {projectData.work}</li>
                            <li>Status: {projectData.status}</li>
                            {/* <li><Date dateString={projectData.date} /></li> */}
                            <li>Company: {projectData.company}</li>
                            <li>Location: {projectData.location}</li>
                            <li>Software: {projectData.software}</li>
                            <li>Rendering: {projectData.rendering}</li>

                        </ul>
                    </div>

                    {/* main write up */}
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
                    <div className={projects.wrap}>

                        <div className={`${projects.pic} ${utilStyles.pcOnly}`}>
                            <Image
                                src={`/media/projects/${projectData.shortTitle}${projectData.image1}`}
                                alt={projectData.imageAlt1}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className={projects.pic}>
                            <Image

                                src={`/media/projects/${projectData.shortTitle}${projectData.image2}`}
                                alt={projectData.imageAlt2}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className={projects.pic}>
                            <Image

                                src={`/media/projects/${projectData.shortTitle}${projectData.image3}`}
                                alt={projectData.imageAlt3}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className={projects.pic}>
                            <Image

                                src={`/media/projects/${projectData.shortTitle}${projectData.image4}`}
                                alt={projectData.imageAlt4}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className={projects.pic}>
                            <Image

                                src={`/media/projects/${projectData.shortTitle}${projectData.image5}`}
                                alt={projectData.imageAlt5}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className={projects.pic}>
                            <Image

                                src={`/media/projects/${projectData.shortTitle}${projectData.image6}`}
                                alt={projectData.imageAlt6}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>


                    </div >
                </SRLWrapper>
                <div className={utilStyles.mobileOnly}>
                    <BackButton
                        link="/"
                        where="Projects"
                    />
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