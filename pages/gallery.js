import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'

import { getSortedProjectsData } from '../lib/projects'

import gallery from '../styles/gallery.module.css'
import utilStyles from '../styles/utils.module.css'

import Image from 'next/image'
import gif from '../styles/gif.module.css'

import { useState } from 'react'
import SidePanel from '../components/SidePanel'





const title = "Gallery";


export default function Gallery({ allProjectsData }) {

    let galleryList = allProjectsData.map(a => a.pics.map(b => ({ ...b, link: a.id, shortTitle: a.shortTitle, title: a.title, type: a.type }))).flat();

    let [randomGalleryList, setRandomGalleryList] = useState(galleryList);

    function mixGallery() {
        let currentIndex = galleryList.length;
        let randomIndex = 0;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [galleryList[currentIndex], galleryList[randomIndex]] = [galleryList[randomIndex], galleryList[currentIndex]];
        }
        return setRandomGalleryList(randomGalleryList = galleryList);
    }

    // const [imageGrid, setImageGrid] = useState(true)
    // function toggleImageGrid() { setImageGrid(!imageGrid); }

    const [gridCount, setGridCount] = useState(true)
    const [imageRatio, setImageRatio] = useState(false)
    const [captionToggle, setCaptionToggle] = useState(false)
    const [sidePanelShow, setSidePanelShow] = useState(false)

    function toggleImageGrid() {
        // if (gridCount < 4) {
        //     setGridCount(currGrid => currGrid + 1)
        // } else { setGridCount(1); }
        setGridCount(!gridCount);
        setCaptionToggle(!captionToggle);
        setImageRatio(!imageRatio);
    }
    function toggleImageGridOnly() {
        // if (gridCount < 4) {
        //     setGridCount(currGrid => currGrid + 1)
        // } else { setGridCount(1); }
        setGridCount(!gridCount);
    }

    function toggleImageRatio() {
        // imageRatio < 2 ? setImageRatio(currRatio => currRatio + 1) : setImageRatio(1);
        setImageRatio(!imageRatio);
    }

    function toggleCaptions() { setCaptionToggle(!captionToggle); }

    function toggleSidePanel() { setSidePanelShow(!sidePanelShow); }

    let aspectRatio = ""
    let ratioText = ""
    switch (imageRatio) {
        case true:
            aspectRatio = '16 / 9';
            ratioText = "Landscape";
            break;

        case false:
            aspectRatio = '1 / 1';
            ratioText = "Square";
            break;

        default:
            aspectRatio = '16 / 9';
            ratioText = "Square";
    }

    let gridSwitch = 3;
    let gridText = ""
    switch (gridCount) {
        case true:
            gridSwitch = 1;
            gridText = "Single"
            break;

        case false:
            gridSwitch = 3;
            gridText = "Grid"

            break;
        default:
            gridSwitch = 1;
            gridText = "Single"
    }

    let imageDisplay = ""
    let imageDisplayText =""
    switch (gridCount, imageRatio) {
        case gridCount && !imageRatio:
            imageDisplay = gallery.squareSingle;
            imageDisplayText = "1 large square"
            break;

        case !gridCount && !imageRatio:
            imageDisplay = gallery.squareGrid;
            imageDisplayText = "square grid"
            break;

        case !gridCount && imageRatio:
            imageDisplay = gallery.landscapeSingle;
            imageDisplayText = "1 large landscape"
            break;


        default:
            imageDisplay = gallery.landscapeGrid;
            imageDisplayText = "landscape grid"
    }
    console.log("image display =" , imageDisplayText)

    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            <div className={utilStyles.title}>
                <h1>{title}</h1>
                {/* <div className={`${utilStyles.pcOnly} ${utilStyles.flex2}`}>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageGrid}>Grid Toggle {gridCount}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageRatio}>Aspect Ratio: {ratioText}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleCaptions}>Captions &nbsp; {captionToggle ? <span className="material-symbols-outlined">toggle_on</span> : <span className="material-symbols-outlined">toggle_off</span>}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={mixGallery}>Mix Gallery</p>
                </div> */}
            </div>

            {/* Main Conent */}
            <div className={`${gallery.imageGrid} ${imageDisplay}`} >

                {/* MAP GALLERY > galleryList */}

                {randomGalleryList.map((pic, index) =>
                    <div key={`${pic.id}${pic.shortTitle}${pic.alt}`} className={gallery.wrapper}>

                        <div className={utilStyles.anchor2} id={`${pic.shortTitle}-${pic.id}`} />


                        <Link href={`#${pic.shortTitle}-${pic.id}`} >
                            <a className={gallery.imageSize} style={{ aspectRatio: `${aspectRatio}` }} onClick={toggleImageGrid}>
                                <Image
                                    src={`/projects/${pic.shortTitle}${pic.image}`}
                                    alt={pic.alt}
                                    layout="fill"
                                    objectFit="cover"
                                    priority={index <= 6 ? true : false}
                                />
                            </a>
                        </Link>


                        <div className={`${captionToggle ? gallery.caption : gallery.hide} ${gridCount ? gallery.captionHide : null}`}>
                            <Link href={`/projects/${pic.link}`}>
                                <a className={gallery.projectLink}>{pic.title} | {pic.shortTitle} | {pic.type} </a>
                            </Link>
                            <p>{pic.alt}</p>
                        </div>
                    </div>

                )}
            </div>

            {/* BOTTOM TOGGLES */}

            <SidePanel
                heading={"Settings"}
            >
                <p className={utilStyles.link} onClick={toggleImageGridOnly}>{gridText} &nbsp;{gridCount ? <span className="material-symbols-outlined">splitscreen</span> : <span className="material-symbols-outlined">grid_on</span>}</p>
                <p className={utilStyles.link} onClick={toggleImageRatio}>{ratioText}&nbsp; {imageRatio ? <span className="material-symbols-outlined">crop_16_9</span> : <span className="material-symbols-outlined">crop_square</span>}</p>
                <p className={`${gridCount? gallery.toggleGray : null} ${utilStyles.link}`} onClick={toggleCaptions}>Captions &nbsp; {captionToggle ? <span className="material-symbols-outlined">toggle_on</span> : <span className="material-symbols-outlined">toggle_off</span>}</p>
                <p className={utilStyles.link} id={gallery.mix} onClick={mixGallery}>Mix Gallery &nbsp;<span className="material-symbols-outlined">cameraswitch</span></p>
            </SidePanel>
        </Layout >

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
