import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import { SRLWrapper } from "simple-react-lightbox";

import Layout, { siteTitle } from '../../components/LayoutSideOpen'
import Date from '../../components/Date'
import ButtonBack from '../../components/ButtonBack'
import ButtonTop from '../../components/ButtonTop'

import { getAllProjectIds, getProjectData } from '../../lib/projects'

import utilStyles from '../../styles/utils.module.css'
import projects from '../../styles/projects.module.css'
import gallery from '../../styles/gallery.module.css'

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
        showCaption: true,
        captionFontFamily: "'Inconsolata', monospace",
        captionFontWeight: 500,
        captionColor: "#f3f3f3",

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
    const [imageRatio, setImageRatio] = useState(false)
    const [planGrid, setPlanGrid] = useState(true)
    const [panoDrop, setPanoDrop] = useState(false)
    const [captionToggle, setCaptionToggle] = useState(false)




    function toggleImageGrid() { setImageGrid(!imageGrid); setCaptionToggle(!captionToggle); }
    function togglePlanGrid() { setPlanGrid(!planGrid); }
    function togglePanoDrop() { setPanoDrop(!panoDrop); }



    return (
        <Layout>
            <Head>
                <title>{siteTitle}: {' '} {projectData.title}</title>
            </Head>
            <div className={projects.top} id="top" />
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
                        <a className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.mobileOnlyFlex}`} href="#images">
                            Images
                        </a>
                        <a className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.mobileOnlyFlex}`} href="#plans">
                            Plans
                        </a>

                        <a href="#images" className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.pcOnly}`}>
                            Images
                            <label htmlFor="imageGrid" className={` ${utilStyles.toggle}  `}>
                                {imageGrid ? <span className="material-symbols-outlined">grid_view</span> : <span className="material-symbols-outlined">view_agenda</span>}
                            </label>
                        </a>

                        <a href="#plans" className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.pcOnly}`}>
                            Plans
                            <label htmlFor="planGrid" className={` ${utilStyles.toggle}  `}>
                                {planGrid ? <span className="material-symbols-outlined">grid_view</span> : <span className="material-symbols-outlined">view_agenda</span>}
                            </label>
                        </a>

                        {projectData.hasOwnProperty("pano") ?
                            <Link href={projectData.pano}>
                                <a target="_blank" className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`}>3D Tour &nbsp;<span className="material-symbols-outlined">north_east</span></a>
                            </Link> : <div />
                        }

                        {projectData.hasOwnProperty("panos") ?
                            <details id="panoDrop" className={` ${utilStyles.grow} `} onClick={togglePanoDrop}>
                                <summary className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`}>3d Tours {panoDrop ? <span class="material-symbols-outlined">expand_less</span> : <span class="material-symbols-outlined">expand_more</span>}</summary>
                                {projectData.panos.map((pano) =>
                                    <Link href={pano.link} ><a target="_blank" className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.font2}`}>{pano.name}&nbsp;<span className="material-symbols-outlined">north_east</span></a></Link>)}
                            </details>
                            : <div />
                        }


                        <input id="imageGrid" className={utilStyles.hide} type="checkbox" onClick={toggleImageGrid} />

                        <input id="planGrid" className={utilStyles.hide} type="checkbox" onClick={togglePlanGrid} />
                    </div>

                    <div className={projects.projDetails}>
                        <h3>Project Details </h3>
                        <ul>
                            <li style={{ display: projectData.type == null ? "none" : "flex" }}>Type: {projectData.type}</li>
                            <li style={{ display: projectData.status == null ? "none" : "flex" }}>Worked On: {projectData.work}</li>
                            <li style={{ display: projectData.work == null ? "none" : "flex" }}>Status: {projectData.status}</li>
                            <li style={{ display: projectData.location == null ? "none" : "flex" }}>Location: {projectData.location}</li>
                            <li style={{ display: projectData.company == null ? "none" : "flex" }}>Company: {projectData.company}</li>
                            <li style={{ display: projectData.software == null ? "none" : "flex" }}>Software: {projectData.software}</li>
                            <li style={{ display: projectData.rendering == null ? "none" : "flex" }}>Rendering: {projectData.rendering}</li>
                            <li style={{ display: projectData.photography == null ? "none" : "flex" }}>Photography: {projectData.photography}</li>
                            {/* <li><Date dateString={projectData.date} /></li> */}
                        </ul>
                    </div>

                    {/* main write up */}
                    <h3>Overview</h3>
                    <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} className={utilStyles.grow} />
                    <div className={utilStyles.pcOnly}>
                        <ButtonBack
                            link="/"
                            where="Projects"
                        />
                    </div>
                </div>
            </div>

            <label htmlFor="imageGrid" className={` ${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link} ${projects.sideLink} ${utilStyles.mobileOnlyFlex}`}>Image Display &nbsp;{imageGrid ? <span className="material-symbols-outlined">grid_view</span> : <span className="material-symbols-outlined">view_agenda</span>}</label>

            <div className={projects.main}>

                <div id="images" className={utilStyles.anchor} />
   
                <div className={imageGrid ? projects.gridWrap1 : projects.gridWrap2}>
                    
                    {/* MAP IMAGES */}
                    
                    {projectData.pics.map((pic, index) =>
                        <div className={projects.wrapper} key={pic.id}>
                            
                            <div className={utilStyles.anchor2} style={{backgroundColor: "red"}} id={`img${pic.id}`}>ANCHOR</div>
                            
                            <Link href={`#img${pic.id}`}>
                                <div onClick={toggleImageGrid} className={projects.pic}>
                                    <Image
                                        src={`/projects/${projectData.shortTitle}${pic.image}`}
                                        alt={pic.alt}
                                        layout="fill"
                                        objectFit="cover"
                                        priority={index <= 4 ? true : false}
                                    />
                                    <h3 className={projects.imageTitle} style={{ display: captionToggle && "none" }}>{pic.id} {pic.alt}</h3>
                                </div>
                            </Link>

                            <div className={captionToggle ? gallery.caption : gallery.hide}>
                                <p>{pic.alt}</p>
                            </div>
                        </div>
                    )}

                </div >

                {/* <div className={utilStyles.bb1} /> */}

                <div id="plans" className={utilStyles.anchor} />

                {/* <h2 onClick={togglePlanGrid} className={utilStyles.mobileOnly} >Plan Display &nbsp; {planGrid? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</h2> */}

                <div className={planGrid ? projects.gridWrap1 : projects.gridWrap2}>
                    {projectData.plans.map((plan) =>
                        <div key={plan.id} className={`${utilStyles.bb1} ${projects.plan}`}>
                            <Image
                                src={`/projects/${projectData.shortTitle}${plan.plan}`}
                                alt={plan.alt}
                                layout="fill"
                                objectFit="contain"
                            />
                            <div className={projects.planDetails}>

                                <h3 className={projects.planTitle}> {plan.alt}</h3>
                                <span class="material-symbols-outlined" style={{ transform: `rotateZ(${projectData.north}deg)`, display: plan.alt.includes("Plan") ? "block" : "none" }}>
                                    navigation
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={utilStyles.pcOnly} >
                    <ButtonTop link="#top" where="Top" />
                </div>
                <div className={`${utilStyles.mobileOnlyFlex} ${utilStyles.flex2} ${utilStyles.ontop}`}>
                    <ButtonBack link="/" where="Projects" />
                    <ButtonTop link="#top" where="Top" />
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
