import { getSortedProjectsData } from '../lib/projects'

export default function MixGallery({ allProjectsData }) {

    let galleryList = allProjectsData.map(a => a.pics.map(b => ({ ...b, link: a.id, shortTitle: a.shortTitle, title: a.title, type: a.type }))).flat();
    console.log(galleryList)

    let randomGalleryList = []

    let currentIndex = galleryList.length;
    let randomIndex = 0;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [galleryList[currentIndex], galleryList[randomIndex]] = [galleryList[randomIndex], galleryList[currentIndex]];
    }
    randomGalleryList = galleryList;

    console.log(randomGalleryList)
    return randomGalleryList;


}


export async function getStaticProps() {
        const allProjectsData = getSortedProjectsData()
        return {
            props: {
                allProjectsData
            }
        }
}