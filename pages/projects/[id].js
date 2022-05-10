import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { SRLWrapper } from "simple-react-lightbox";

import Layout, { siteTitle } from '../../components/LayoutSideOpen'
import Date from '../../components/Date'
import ButtonBack from '../../components/ButtonBack'
import ButtonTop from '../../components/ButtonTop'

import { getAllProjectIds, getProjectData } from '../../lib/projects'

import utilStyles from '../../styles/utils.module.css'
import projects from '../../styles/projects.module.css'
import { useState } from "react";

const options = {
    progressBar: {
        showProgressBar: false
    },
    settings: {
        hideControlsAfter: 200,


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
    let panos = false;

    // check if the project has a pano link or multiple pano links >> if so, later run code for link buttons
    if (projectData.hasOwnProperty("pano")) {
        pano = true;
    } else if (projectData.hasOwnProperty("panos")) {
        panos = true;
    } else {
        pano = false;
        panos = false;
    }

    const [imageGrid, setImageGrid] = useState(false)
    function toggleImageGrid(){setImageGrid(!imageGrid);}

    const [planGrid, setPlanGrid] = useState(true)
    function togglePlanGrid(){setPlanGrid(!planGrid);}

    const [panoDrop, setPanoDrop] =useState(false)
    function togglePanoDrop(){setPanoDrop(!panoDrop)}


    return (
        <Layout>
            <Head>
                <title>{siteTitle}: {' '} {projectData.title}</title>
            </Head>
            <div className={projects.top} id="top"/>
            <div className={projects.details} >

            <div className={utilStyles.title}>
                <h1>{projectData.title}</h1>
            </div>



                {/* Mobile Only Header Image */}
                <div className={utilStyles.mobileOnly}>
                    <div className={projects.thumb} >
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
                        <a className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`} href="#images">Images</a>
                        <a className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`} href="#plans">Plans</a>

                        { projectData.hasOwnProperty("pano") ?
                        <Link href={projectData.pano}>
                        <a target="_blank" className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`}>3D Tour &nbsp;<span className="material-symbols-outlined">north_east</span></a>
                        </Link> : <div/>
                        }

                        { projectData.hasOwnProperty("panos") ?
                        <details id="panoDrop" className={utilStyles.grow} onClick={togglePanoDrop}>
                            <summary className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`}>3d Tours &nbsp;{ panoDrop ?  <span class="material-symbols-outlined">expand_less</span> : <span class="material-symbols-outlined">expand_more</span> }</summary>
                            {projectData.panos.map((pano) => 
                            <Link href={pano.link} ><a target="_blank" className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`}>{pano.name}&nbsp;<span className="material-symbols-outlined">north_east</span></a></Link>)}
                        </details>
                        : <div/>
                        }

                        {/* <label htmlFor="imageGrid" className={`  ${utilStyles.bb1} ${utilStyles.link} ${utilStyles.pcOnly}`}>Image Display {imageGrid? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</label>           */}
                        <label htmlFor="imageGrid" className={` ${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`}>Image Display &nbsp;{imageGrid? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</label>          
                        <input id="imageGrid" className={utilStyles.hide} type="checkbox" onClick={toggleImageGrid} />
                             
                        <label htmlFor="planGrid" className={`${utilStyles.pcOnly} ${utilStyles.bb1} ${utilStyles.link}`}>Plan Display &nbsp;{planGrid? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</label>
                        <input id="planGrid" className={utilStyles.hide} type="checkbox" onClick={togglePlanGrid} />
                        
                        <div>
                        <label htmlFor="imageGrid" className={` ${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link} ${projects.sideLink} ${projects.left}`}>Image Display &nbsp;{imageGrid? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</label>          

                        </div>

                    </div>

                    <div className={projects.projDetails}>
                        <h3>Project Details </h3> 
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
                    <ButtonBack
                        link="/"
                        where="Projects"
                    />
                    </div>
                </div>
            </div>

            <div className={projects.main}>

                <div id="images" className={utilStyles.anchor} />
                {/* <h2 onClick={toggleImageGrid} className={utilStyles.mobileOnly}>Image Display &nbsp; {imageGrid? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</h2> */}

                <SRLWrapper options={options}>
                    <div className={imageGrid? projects.gridWrap1 : projects.gridWrap2}>
                        {projectData.pics.map((pic) => 
                        <div className={`${pic.id == 1 ? utilStyles.pcOnly : utilStyles.flex} ${imageGrid? projects.pic1 : projects.pic2}`} key={pic.id}>
                            <Image
                                src={`/projects/${projectData.shortTitle}${pic.image}`}
                                alt={pic.alt}
                                layout="fill"
                                objectFit={!imageGrid? "cover" : "contain"}
                            />
                        </div>
                        )}
                    </div >
                    
                    <div className={utilStyles.bb1} />
                    <div id="plans" className={utilStyles.anchor}/>
                    {/* <h2 onClick={togglePlanGrid} className={utilStyles.mobileOnly} >Plan Display &nbsp; {planGrid? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</h2> */}

                    <div className={planGrid? projects.gridWrap1 : projects.gridWrap2}>
                    {projectData.plans.map((plan) => 
                        <div key={plan.id} className={`${utilStyles.bb1} ${projects.plan}`}>
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
                    <ButtonBack link="/" where="Projects" />
                    <ButtonTop link="#top" />
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