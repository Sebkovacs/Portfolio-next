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

    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            <div className={utilStyles.title}>
                <h1>{title}</h1>
            </div>

            <input id="imageGrid" className={utilStyles.hide} type="checkbox" onClick={toggleImageGrid} />
            <label htmlFor="imageGrid" className={` ${utilStyles.grow} ${utilStyles.bb1} ${utilStyles.link} ${gallery.sideLink} `}>Image Display &nbsp; {imageGrid ? <span className="material-symbols-outlined">view_agenda</span> : <span className="material-symbols-outlined">grid_view</span>}</label>

            {/* ${utilStyles.mobileOnlyFlex} */}

            <div className={imageGrid ? gallery.imageGrid1 : gallery.imageGrid2}>
                {galleryList.map((pic) =>

                    <div key={`${pic.id}${pic.shortTitle}${pic.alt}`} className={imageGrid ? gallery.image1 : gallery.image2}>
                        <Image
                            src={`/projects/${pic.shortTitle}${pic.image}`}
                            alt={pic.alt}
                            layout="fill"
                            objectFit="cover"
                        />
                        <Link href={`/projects/${pic.link}`}>
                            <a className={gallery.title}>Project: {pic.title}
                            &nbsp; 
                            <span class="material-symbols-outlined">
                                more_up
                            </span>
                            </a>
                        </Link>
                        <p className={gallery.des}>{pic.alt}</p>
                    </div>

                )}
            </div>

            <Link href={"/contact"}>
                <a className={gif.cash}>
                    <p className={gif.typewriter}>Get in Touch!</p>
                    <Image src={"/cash.gif"} layout="fill" objectFit='contain' />
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
