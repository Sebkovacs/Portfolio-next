import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'

import { getSortedProjectsData } from '../lib/projects'

import gallery from '../styles/gallery.module.css'
import utilStyles from '../styles/utils.module.css'

import Image from 'next/image'
import gif from '../styles/gif.module.css'

import { useState } from 'react'





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

    const [gridCount, setGridCount] = useState(false)
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
            aspectRatio = '1 / 1';
            ratioText = "Square";
    }

    let gridSwitch = false
    switch (gridCount) {
        case true:
            gridSwitch = 1;
            break;

        case false:
            gridSwitch = 3;

            break;
        default:
            gridSwitch = 1;

    }

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
            <div className={` ${gallery.imageGrid}`} style={{ gridTemplateColumns: `repeat(${gridSwitch}, 1fr`, gap: imageRatio ? "10vh" : null }}>

                {/* MAP GALLERY > galleryList */}

                {randomGalleryList.map((pic, index) => 
                    <div key={`${pic.id}${pic.shortTitle}${pic.alt}`} className={gallery.wrapper}>

                        <div className={utilStyles.anchor2} id={`${pic.shortTitle}-${pic.id}`}/>


                        <Link href={`#${pic.shortTitle}-${pic.id}`} >
                            <a className={gallery.imageSize} style={{ aspectRatio: `${aspectRatio}` }} onClick={toggleImageGrid}>
                                <Image
                                    src={`/projects/${pic.shortTitle}${pic.image}`}
                                    alt={pic.alt}
                                    layout="fill"
                                    objectFit="cover"
                                    priority = {index <= 6 ? true : false}
                                />
                            </a>
                        </Link>


                        <div className={captionToggle ? gallery.caption : gallery.hide}>
                            <Link href={`/projects/${pic.link}`}>
                                <a className={gallery.projectLink}>{pic.title} | {pic.shortTitle} | {pic.type} </a>
                            </Link>
                            <p>{pic.alt}</p>
                        </div>
                    </div>

                )}
            </div>

            {/* BOTTOM TOGGLES */}

            <aside className={`  ${gallery.sidePanel} ${utilStyles.list}`} style={{ right: sidePanelShow ? "0" : "-300px" }} >
                <h3>Settings</h3>
                <div className={gallery.sidePanelToggle} onClick={toggleSidePanel} style={{ transition: "ease 1s", border: sidePanelShow ? "2px solid var(--border1)" : "2px solid transparent" }}>
                    {sidePanelShow ? <span class="material-symbols-outlined">
                        navigate_next
                    </span> : <span class="material-symbols-outlined">
                        navigate_before
                    </span>}
                </div>
                <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageGridOnly}>Grid Toggle {gridCount}</p>
                <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageRatio}>Aspect Ratio: {ratioText}</p>
                <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleCaptions}>Captions &nbsp; {captionToggle ? <span className="material-symbols-outlined">toggle_on</span> : <span className="material-symbols-outlined">toggle_off</span>}</p>
                <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={mixGallery}>Mix Gallery</p>
            </aside>
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
