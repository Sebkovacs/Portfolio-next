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

    let galleryList = allProjectsData.map(a => a.pics.map(b => ({ ...b, link: a.id, shortTitle: a.shortTitle, title: a.title }))).flat();

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

    const [gridCount, setGridCount] = useState(2)

    function toggleImageGrid() {
        if (gridCount < 4) {
            setGridCount(currGrid => currGrid + 1)
        } else { setGridCount(1); }
    }

    const [imageRatio, setImageRatio] = useState(1)
    function toggleImageRatio() {
        imageRatio < 2 ? setImageRatio(currRatio => currRatio + 1) : setImageRatio(1);
    }

    const [captionToggle, setCaptionToggle] = useState(false)
    function toggleCaptions() { setCaptionToggle(!captionToggle); }

    const [sidePanelShow, setSidePanelShow] = useState(false)
    function toggleSidePanel() { setSidePanelShow(!sidePanelShow); }

    let aspectRatio = ""
    let ratioText = ""
    switch (imageRatio) {
        case 1:
            aspectRatio = '16 / 9';
            ratioText ="Landscape";
            break;

        // case 2:
        //     aspectRatio = '16 / 9';
        //     break;

        // case 3:
        //     aspectRatio = '4 / 3';
        //     break;

        // case 4:
        //     aspectRatio = '1 / 1';
        //     break;

        default:
            aspectRatio = '1 / 1';
            ratioText ="Square";
    }


    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            <div className={utilStyles.title}>
                <h1>{title}</h1>
                <div className={`${utilStyles.pcOnly} ${utilStyles.flex2}`}>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageGrid}>Grid Count: {gridCount}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageRatio}>Aspect Ratio: {ratioText}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleCaptions}>Captions &nbsp; {captionToggle ? <span className="material-symbols-outlined">toggle_on</span> : <span className="material-symbols-outlined">toggle_off</span>}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={mixGallery}>Mix Gallery</p>
                </div>
            </div>

            {/* Main Conent */}
            <div className={`${gif.party} ${gallery.imageGrid1}`} style={{ gridTemplateColumns: `repeat(${gridCount}, 1fr` }}>

                {/* MAP GALLERY > galleryList */}

                {randomGalleryList.map((pic) =>
                    <div key={`${pic.id}${pic.shortTitle}${pic.alt}`} className={gallery.wrapper}>
                        <Link href={`/projects/${pic.link}`}>
                            <a>
                                <div className={gallery.image1} style={{ aspectRatio: `${aspectRatio}` }}>
                                    <Image
                                        src={`/projects/${pic.shortTitle}${pic.image}`}
                                        alt={pic.alt}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <div className={captionToggle ? gallery.hide : gallery.hover}>
                                    
                                        <a className={gallery.title}>Project: {pic.title}
                                            &nbsp;
                                            <span class="material-symbols-outlined">
                                                north_east
                                            </span>
                                        </a>

                                        <p className={gallery.des}>{pic.alt}</p>
                                    </div>
                                </div>

                                <div key={`${pic.id}${pic.shortTitle}${pic.alt}`} className={captionToggle ? gallery.caption : gallery.hide}>
                                    <p>{pic.title}</p>
                                    <p>{pic.alt}</p>
                                    <Link href={`/projects/${pic.link}`}>
                                        <a className={gallery.captionLink}>
                                            <span style={{ fontSize: "20px" }} className="material-symbols-outlined">north_east</span>
                                        </a>
                                    </Link>
                                </div>
                            </a>
                        </Link>
                    </div>

                )}
        </div>

            {/* BOTTOM TOGGLES */ }

    <aside className={`  ${gallery.sidePanel} ${utilStyles.list}`} style={{ right: sidePanelShow ? "0" : "-300px" }} >
        <h3>Settings</h3>
        <div className={gallery.sidePanelToggle} onClick={toggleSidePanel} style={{ transition: "ease 1s", border: sidePanelShow ? "2px solid var(--border1)" : "2px solid transparent" }}>
            {sidePanelShow ? <span class="material-symbols-outlined">
                navigate_next
            </span>:<span class="material-symbols-outlined">
                navigate_before
            </span> }
        </div>
        <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageGrid}>Grid Count: {gridCount}</p>
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
