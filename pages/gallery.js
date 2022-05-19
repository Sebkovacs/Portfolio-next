import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import { getSortedProjectsData } from '../lib/projects'
import gallery from '../styles/gallery.module.css'
import utilStyles from '../styles/utils.module.css'

import Image from 'next/image'
import gif from '../styles/gif.module.css'
import neArrow from '../public/icons/ne-arrow.svg'

import { useState } from 'react'





const title = "Gallery";

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


export default function Gallery({ allProjectsData }) {

    let galleryList = allProjectsData.map(a => a.pics.map(b => ({ ...b, link: a.id, shortTitle: a.shortTitle, title: a.title }))).flat();

    shuffle(galleryList)

    const [imageGrid, setImageGrid] = useState(true)
    function toggleImageGrid() { setImageGrid(!imageGrid); }

    const [captionToggle, setCaptionToggle] = useState(false)
    function toggleCaptions() { setCaptionToggle(!captionToggle); }

    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            <div className={utilStyles.title}>
                <h1>{title}</h1>
                <div className={utilStyles.buttons}>
                    <label htmlFor="toggleCatpions" className={` ${utilStyles.download} ${utilStyles.pcOnly} ${gallery.toggle} `}>Captions &nbsp; {captionToggle ? <span className="material-symbols-outlined">toggle_off</span> : <span className="material-symbols-outlined">toggle_on</span>}</label>
                    <label htmlFor="imageGrid" className={` ${utilStyles.download}  ${utilStyles.pcOnly} ${gallery.toggle} `}>Image Display &nbsp; {imageGrid ? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</label>
                </div>
            </div>

            <input id="toggleCatpions" className={utilStyles.hide} type="checkbox" onClick={toggleCaptions} />

            <input id="imageGrid" className={utilStyles.hide} type="checkbox" onClick={toggleImageGrid} />

            {/* ${utilStyles.mobileOnlyFlex} */}

            <div className={`${gif.party} ${imageGrid ? gallery.imageGrid1 : gallery.imageGrid2}`}>
                {galleryList.map((pic) =>

                    <div className={gallery.wrapper}>
                        <div key={`${pic.id}${pic.shortTitle}${pic.alt}`} className={imageGrid ? gallery.image1 : gallery.image2}>
                            <Image
                                src={`/projects/${pic.shortTitle}${pic.image}`}
                                alt={pic.alt}
                                layout="fill"
                                objectFit="cover"
                            />
                            <div className={captionToggle ? gallery.hide : gallery.hover}>
                                <Link href={`/projects/${pic.link}`}>
                                    <a className={gallery.title}>Project: {pic.title}
                                        &nbsp;
                                        <span class="material-symbols-outlined">
                                            north_east
                                        </span>
                                    </a>
                                </Link>
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

                    </div>

                )}
            </div>
<label htmlFor="toggleCatpions" className={` ${utilStyles.link} ${gallery.toggleCaption}  ${gallery.toggleBottom} `}>Captions &nbsp; {captionToggle ? <span className="material-symbols-outlined">toggle_off</span> : <span className="material-symbols-outlined">toggle_on</span>}</label>
<label htmlFor="imageGrid" className={` ${utilStyles.link} ${gallery.toggleGrid} ${gallery.toggleBottom}`}>Image Display &nbsp; {imageGrid ? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</label>

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
