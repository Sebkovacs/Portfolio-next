import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/LayoutFilter'
import { getSortedProjectsData } from '../lib/projects'
import gallery from '../styles/gallery.module.css'
import utilStyles from '../styles/utils.module.css'
import filters from '../styles/filters.module.css'

import Image from 'next/image'
import { useState } from 'react'
import SidePanelRight from '../components/SidePanelRight'
import Side from '../components/Side'
import theme from '../styles/theme.module.css'
import { useThemeDark } from '../context/AppContext'


const title = "Gallery";
const sidePanelHeading = "Filters";

export default function Gallery({ allProjectsData }) {
    let galleryList = allProjectsData.map(a => a.pics.map(b => ({ ...b, link: a.id, shortTitle: a.shortTitle, title: a.title, type: a.type, software: a.software, status: a.status, render: a.rendering, tags: [a.type, a.software, a.status, a.rendering] }))).flat();
    let [randomGalleryList, setRandomGalleryList] = useState(galleryList);
    let data = galleryList.flat()
    const [themeDark] = useThemeDark();

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }



    const categories = data.map(e => e.type);
    const software = data.map(e => e.software);
    const render = data.map(e => e.render);
    const status = data.map(e => e.status);
    const projects = data.map(e => e.title);

    let allSoftware = software.concat(render)

    let filterCategory = categories.filter(onlyUnique)
    let filterAllSoftware = allSoftware.filter(onlyUnique)
    let filterStatus = status.filter(onlyUnique)
    let filterProject = projects.filter(onlyUnique)


    function updateFilteredItems() {
        let modData = data
        for (let i = 0; i < modData.length; i++) {
            for (let e = 0; e < filterList.length; e++) {
                modData[i].hasOwnProperty(filterList[e])
                return modData[i]
            }
        }
    }



    let allSoftwareFilterNull = filterAllSoftware.filter(Boolean)

    let reducedCategories = filterCategory.map(e => ({ type: e, id: e, type: "category" }))
    let reducedSoftware = allSoftwareFilterNull.map(e => ({ software: e, id: e, type: "software" }))
    let reducedStatus = filterStatus.map(e => ({ status: e, id: e, type: "status" }))
    let reducedProject = filterProject.map(e => ({ project: e, id: e, type: "project" }))

    reducedCategories.sort(function (a, b) { if (a.id < b.id) return -1; if (a.id > b.id) return 1; return 0; });
    reducedSoftware.sort(function (a, b) { if (a.id < b.id) return -1; if (a.id > b.id) return 1; return 0; });
    reducedStatus.sort(function (a, b) { if (a.id < b.id) return -1; if (a.id > b.id) return 1; return 0; });
    reducedProject.sort(function (a, b) { if (a.id < b.id) return -1; if (a.id > b.id) return 1; return 0; });

    let projectList = { title: "Projects", list: reducedProject }
    let softwareList = { title: "Software", list: reducedSoftware }
    let statusList = { title: "Status", list: reducedStatus }
    let categoryList = { title: "Categories", list: reducedCategories }
    // let galleryList = allProjectsData.map(a => a.pics.map(b => ({ ...b, link: a.id, shortTitle: a.shortTitle, title: a.title, type: a.type, software: a.software, status: a.status, render: a.rendering }))).flat();

    // data = [reducedCategories, reducedSoftware, reducedStatus, reducedCategories]
    data = [
        // projectList
        , softwareList
        , statusList
        , categoryList
    ]

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
            ratioText = "Square";
            break;

        case false:
            aspectRatio = '1 / 1';
            ratioText = "Landscape";
            break;
    }

    // let gridSwitch = 3;
    // let gridText = ""
    // switch (gridCount) {
    //     case true:
    //         gridSwitch = 1;
    //         gridText = "Single"
    //         break;

    //     case false:
    //         gridSwitch = 3;
    //         gridText = "Grid"
    //         break;
    // }

    let imageDisplay = ""
    let imageDisplayText = ""
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

        case gridCount && imageRatio:
            imageDisplay = gallery.landscapeGrid;
            imageDisplayText = "landscape grid"
            break;
    }

    let [picsList, setPics] = useState(galleryList)
    let [filterList, setFilterList] = useState([])

    // const modFilters = e => {
    //     if (!filterList.includes(e.target.id)) {
    //         setFilterList(filterList.push(e.target.id))

    //     } else {
    //         let index = filterList.indexOf(e.target.id);
    //         setFilterList(filterList.splice(index, 1));
    //     }
    //     setFilterList([...filterList]);
    // }\



    const modFilters = e => {
        if (!filterList.includes(e.target.id)) {
            setFilterList(filterList.push(e.target.id))
    
            let filteredGallery = []
            for (let i = 0; i < galleryList.length; i++) {
                for (let a = 0; a < 4; a++ ) {
                    if (filterList.includes(galleryList[i].tags[a])) {
                        
                        filteredGallery.push(galleryList[i])
                        
                    }
                }
              }
              setRandomGalleryList( randomGalleryList = filteredGallery)

        } else {
            let index = filterList.indexOf(e.target.id);
            setFilterList(filterList.splice(index, 1));
            
            let filteredGallery = []
            for (let i = 0; i < galleryList.length; i++) {
                for (let a = 0; a < 4; a++ ) {
                    if (filterList.includes(galleryList[i].tags[a])) {
                        
                        filteredGallery.push(galleryList[i])
                        
                    }
                }
            }
            setRandomGalleryList( randomGalleryList = filteredGallery)
        }
        setFilterList([...filterList]);
    };

    function setAll () {
        setRandomGalleryList(galleryList)
        setFilterList([])
      }

    return (
        <Layout title={title} sidePanelHeading={sidePanelHeading} data={data}>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
            <Side
                    title={title}
    heading={"Filters"}
    >

                <p>Applied Filters</p>
                {filterList.map(a => <p className={filters.tag} id={a} key={a} onClick={modFilters}>{a}</p>)}

                <p>Filters</p>
                {title == "Gallery" && data.map(({ title, list }) =>
                    <details className={filters.filterContainer}>
                        <summary className={filters.filter}>{title}</summary>
                        {list.map(a => <p className={filters.tag} id={a.id} key={a.id} onClick={modFilters}>{a.id}</p>)}
                    </details>)}
                    <div className={filters.tag} onClick={setAll}>Reset</div>

            </Side>
            <div className={utilStyles.title}>
                <h1>{title}</h1>
                {/* <div className={`${utilStyles.pcOnly} ${utilStyles.flex2}`}>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageGrid}>Grid Toggle {gridCount}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleImageRatio}>Aspect Ratio: {ratioText}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={toggleCaptions}>Captions &nbsp; {captionToggle ? <span className="material-symbols-outlined">toggle_on</span> : <span className="material-symbols-outlined">toggle_off</span>}</p>
                    <p className={`${gallery.toggle} ${utilStyles.link}`} onClick={mixGallery}>Mix Gallery</p>
                </div> */}
            </div>

            {/* Main Content */}
            <div className={`${gallery.imageGrid} ${imageDisplay}`} >

                {/* MAP GALLERY > galleryList */}

                {randomGalleryList.map((pic, index) =>
                    <div key={`${pic.id}${pic.shortTitle}${pic.alt}`} className={gallery.wrapper}>

                        <div className={utilStyles.anchor2} id={`${pic.shortTitle}-${pic.id}`} />


                        <Link href={`#${pic.shortTitle}-${pic.id}`} >
                            <a className={gallery.imageSize} style={{ aspectRatio: `${aspectRatio}` }} onClick={toggleImageGrid}>
                                <Image
                                    src={`/projects/${pic.shortTitle}${pic.image}`}
                                    alt={pic.hasOwnProperty("caption") ? pic.caption : pic.alt}
                                    layout="fill"
                                    objectFit="cover"
                                    priority={index <= 6 ? true : false}
                                />
                            </a>
                        </Link>


                        <div className={`${captionToggle ? gallery.caption : gallery.hide} ${gridCount ? gallery.captionHide : null}`}>
                            <Link href={`/projects/${pic.link}`}>
                                <a className={gallery.projectLink} id={themeDark && theme.darkmodeAlt}>{pic.title} | {pic.shortTitle} | {pic.type} </a>
                            </Link>
                            <p>{pic.hasOwnProperty("caption") ? pic.caption : pic.alt}</p>
                        </div>
                    </div>

                )}
            </div>

            <SidePanelRight
                heading={"Settings"}
            >
                <p className={utilStyles.link2} onClick={toggleImageGridOnly}>{!gridCount ? "Grid" : "Single"} &nbsp;{!gridCount ? <span className="material-symbols-outlined">grid_on</span> : <span className="material-symbols-outlined">splitscreen</span>}</p>
                <p className={utilStyles.link2} onClick={toggleImageRatio}>{ratioText}&nbsp; {imageRatio ? <span className="material-symbols-outlined">crop_square</span> : <span className="material-symbols-outlined">crop_16_9</span>}</p>
                <p className={`${gridCount ? gallery.toggleGray : null} ${utilStyles.link2}`} onClick={toggleCaptions}>Captions &nbsp; {captionToggle ? <span className="material-symbols-outlined">toggle_on</span> : <span className="material-symbols-outlined">toggle_off</span>}</p>
                <p className={utilStyles.link2} id={gallery.mix} onClick={mixGallery}>Mix Gallery &nbsp;<span className="material-symbols-outlined">cameraswitch</span></p>
            </SidePanelRight>

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
