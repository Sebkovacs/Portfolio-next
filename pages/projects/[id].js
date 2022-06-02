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

import { useState } from "react"
import { useEffect } from 'react'



export default function Project({ projectData }) {
    let pano = false;
    let panos = false;

    let mobileDevice = 1000
    let isMobile = false

    let aspectRatio = ""
    let ratioText = ""

    let gridText = ""
    let gridSwitch = false

    // check if the project has a pano link or multiple pano links >> if so, later run code for link buttons
    if (projectData.hasOwnProperty("pano")) {
        pano = true;
    } else if (projectData.hasOwnProperty("panos")) {
        panos = true;
    } else {
        pano = false;
        panos = false;
    }

    if (typeof window !== 'undefined') {

        mobileDevice = window.innerWidth;
        
    }
    mobileDevice <= 425 ? isMobile = true : false;
    console.log("this is a mobile device:", isMobile)
    console.log("screen width is:", mobileDevice)

    const [imageGrid, setImageGrid] = useState(false)
    const [imageRatio, setImageRatio] = useState(isMobile)
    const [planGrid, setPlanGrid] = useState(true)
    const [panoDrop, setPanoDrop] = useState(false)
    const [captionToggle, setCaptionToggle] = useState(false)
    const [imageControls, setImageControls] = useState(false)

    function toggleImageGrid() { setImageGrid(!imageGrid); }
    function toggleZoom() { setImageGrid(!imageGrid); setCaptionToggle(!captionToggle); }
    function toggleZoomMobile() { setImageGrid(!imageGrid); setCaptionToggle(!captionToggle); setImageRatio(!imageRatio); }
    function togglePlanGrid() { setPlanGrid(!planGrid); }
    function togglePanoDrop() { setPanoDrop(!panoDrop); }
    function toggleImageRatio() { setImageRatio(!imageRatio); }
    function imageControlsToggle() { setImageControls(!imageControls); console.log(imageControls) }





    switch (imageRatio) {
        case false:
            aspectRatio = '16 / 9';
            ratioText = "Landscape";
            break;

        case true:
            aspectRatio = '1 / 1';
            ratioText = "Square";
            break;
    }


    switch (imageGrid) {
        case true:
            gridSwitch = 1;
            gridText = "Single";
            break;

        case false:
            gridSwitch = 3;
            gridText = "Grid";
            break;
    }


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
                        {/* MOBILE AND PC - Anchor Links */}

                        <a className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.mobileOnlyFlex}`} href="#images">Images</a>
                        <a className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.mobileOnlyFlex}`} href="#plans">Plans</a>

                        {/* PC ONLY IMAGE CONTROLS */}

                        <a href="#images" className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.pcOnly}`}>
                            Images
                            <label htmlFor="imageGrid" className={utilStyles.toggle} >
                                {imageGrid ? <span className="material-symbols-outlined">crop_16_9</span> : <span className="material-symbols-outlined">grid_view</span>}
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
                                <a target="_blank" className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`}>3D Tour &nbsp;<span className="material-symbols-outlined">open_in_new</span></a>
                            </Link> : <div />
                        }

                        {projectData.hasOwnProperty("panos") ?
                            <details id="panoDrop" className={` ${utilStyles.grow} `} onClick={togglePanoDrop}>
                                <summary className={`${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link}`}>3d Tours {panoDrop ? <span class="material-symbols-outlined">expand_less</span> : <span class="material-symbols-outlined">expand_more</span>}</summary>
                                {projectData.panos.map((pano) =>
                                    <Link href={pano.link} ><a target="_blank" className={`${utilStyles.grow} ${utilStyles.link} ${utilStyles.font2}`}>{pano.name}&nbsp;<span className="material-symbols-outlined">open_in_new</span></a></Link>)}
                            </details>
                            : <div />
                        }


                        <input id="imageGrid" className={utilStyles.hide} type="checkbox" onClick={toggleZoom} />

                        <input id="planGrid" className={utilStyles.hide} type="checkbox" onClick={togglePlanGrid} />
                    </div>

                    <div className={projects.projDetails}>
                        <h3>Project Details </h3>
                        <ul>
                            <li style={{ display: projectData.type == null ? "none" : "flex" }}>Type: {projectData.type}</li>
                            <li style={{ display: projectData.status == null ? "none" : "flex" }}>Status: {projectData.status}</li>
                            <li style={{ display: projectData.work == null ? "none" : "flex", backgroundColor: projectData.work == "Construction" && "var(--s2)", fontWeight: projectData.work == "Construction" && "800"}}>Worked On: {projectData.work}</li>
                            <li style={{ display: projectData.location == null ? "none" : "flex" }}>Location: {projectData.location}</li>
                            <li style={{ display: projectData.company == null ? "none" : "flex" }}>Company: {projectData.company}</li>
                            <li style={{ display: projectData.architects == null ? "none" : "flex" }}>Architects: {projectData.architects}</li>
                            <li style={{ display: projectData.contractor == null ? "none" : "flex" }}>Contractor: {projectData.contractor}</li>
                            <li style={{ display: projectData.projectManager == null ? "none" : "flex" }}>Project Manager: {projectData.projectManager}</li>
                            <li style={{ display: projectData.value == null ? "none" : "flex" }}>Project Value: {projectData.value}</li>
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


            {/* Main Content */}

            <div className={projects.main}>

                <div id="images" className={utilStyles.anchor2}></div>

                <div className={imageGrid ? projects.gridWrap1 : projects.gridWrap2}>

                    {/* MAP IMAGES */}

                    {projectData.pics.map((pic, index) =>
                        <div className={projects.wrapper} key={pic.id}>

                            <div className={utilStyles.anchor2} id={`img${pic.id}`} />

                            <Link href={`#img${pic.id}`}>
                                <div onClick={!isMobile? toggleZoom : toggleZoomMobile} className={projects.pic} style={{ aspectRatio: ` ${aspectRatio}` }}>
                                    <Image
                                        src={`/projects/${projectData.shortTitle}${pic.image}`}
                                        alt={pic.hasOwnProperty("caption") ? pic.caption : pic.alt}
                                        layout="fill"
                                        objectFit="cover"
                                        priority={index <= 4 ? true : false}
                                    />
                                    <h3 className={projects.imageTitle} style={{ display: captionToggle && "none" }}>{pic.hasOwnProperty("caption") ? pic.caption : pic.alt}</h3>
                                </div>
                            </Link>

                            <div className={captionToggle ? gallery.caption : gallery.hide}>
                                <p>{pic.hasOwnProperty("caption") ? pic.caption : pic.alt}</p>
                            </div>
                        </div>
                    )}

                </div >

                {/* MAP Plans */}

                <div id="plans" className={utilStyles.anchor} />

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
                <div className={`${utilStyles.mobileOnlyFlex} ${utilStyles.flex2} ${utilStyles.ontop} ${projects.bottomLinks}`}>
                    <ButtonBack link="/" where="Projects" />
                    <ButtonTop link="#top" where="Top" />
                </div>
            </div >


            {/* Mobile Device Image Controls */}

            <div className={`${imageControls ? projects.controlsVisible : projects.controlsHidden}  ${projects.mobileImageControls} ${utilStyles.mobileOnlyFlex}`}>
                <div className={projects.mobileControlsToggle} onClick={imageControlsToggle} style={{ backgroundColor: imageControls && "var(--p3)", color: imageControls && "var(--bg2)" }}>
                    Image Options
                    &nbsp;
                    {imageControls ? <span className="material-symbols-outlined" style={{ color: imageControls && "var(--bg2)" }}>arrow_drop_down</span> : <span className="material-symbols-outlined" style={{ color: !imageControls && "var(--t1)" }}>arrow_drop_up</span>}
                </div>
                <a className={utilStyles.link2} onClick={toggleImageRatio}>
                    {ratioText}
                    &nbsp;
                    {imageRatio ? <span className="material-symbols-outlined">crop_square</span> : <span className="material-symbols-outlined">crop_16_9</span>}
                </a>

                <Link href="#images">
                    <a onClick={toggleImageGrid}
                        className={utilStyles.link2}
                    >
                        {gridText}
                        &nbsp;
                        {imageGrid ? <span className="material-symbols-outlined">splitscreen</span> : <span className="material-symbols-outlined">grid_on</span>}
                    </a>
                </Link>
                <a className={utilStyles.link2} onClick={() => setCaptionToggle(!captionToggle)}>
                    Captions
                    &nbsp;{captionToggle ? <span className="material-symbols-outlined">toggle_on</span> : <span className="material-symbols-outlined">toggle_off</span>}
                </a>

            </div>
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
