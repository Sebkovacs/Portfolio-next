import Head from 'next/head'
import Layout, { siteTitle } from '../components/LayoutFilter'
import utilStyles from '../styles/utils.module.css'
import blog from '../styles/blog.module.css'
import filters from '../styles/filters.module.css'
import { getSortedPostsData } from '../lib/posts'
import { useState } from 'react'
import Link from 'next/link'
import Side from '../components/Side'
import theme from '../styles/theme.module.css'
import { useThemeDark } from '../context/AppContext'

const title = "Blog"
const sidePanelHeading = "Filters"

let mobileDevice = 1
let isMobile = false
if (typeof window !== 'undefined') {

  mobileDevice = window.innerWidth;

}
mobileDevice <= 768 ? isMobile = true : isMobile = false;

export default function Blog({ allPostsData }) {
  const [themeDark] = useThemeDark();
  let data = allPostsData;
  let [posts, setPosts] = useState(data)
  let [filterList, setFilterList] = useState([])

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const categories = data.map(e => e.category);

  let filterCat = categories.filter(onlyUnique)

  let reducedCat = filterCat.map((e, index) => ({ category: e, id: e }))

  data = reducedCat

  const modFilters = e => {
    if (!filterList.includes(e.target.id)) {
      setFilterList(filterList.push(e.target.id))

      let filteredPosts = []
      for (let i = 0; i < allPostsData.length; i++) {
        if (filterList.includes(allPostsData[i].category)) {
          filteredPosts.push(allPostsData[i])
        }
      }
      setPosts(posts = filteredPosts)
    } else {
      let index = filterList.indexOf(e.target.id);
      setFilterList(filterList.splice(index, 1));

      let filteredPosts = []
      for (let i = 0; i < allPostsData.length; i++) {
        if (filterList.includes(allPostsData[i].category)) {
          filteredPosts.push(allPostsData[i])
        }
      }
      setPosts(posts = filteredPosts)
    }
    setFilterList([...filterList]);
  };

  function setAll() {
    setPosts(allPostsData)
    setFilterList(data)
  }

  let tagOn = themeDark ? "var(--t1)" : "var(--p2)"
  let tagOff = themeDark ? "var(--border2)" : "var(--s2)"

  return (
    <Layout
      title={title}
      sidePanelHeading={sidePanelHeading}
      data={data}
    >
      <Head>
        <title>{siteTitle} {' | '} {title}</title>
      </Head>
      {!isMobile &&
        <Side
          heading={"Filters"}
          title={title}
        >
          {data.map(e => <div
            className={filters.tag}
            style={{ backgroundColor: !filterList.includes(e.id) ? `${tagOn}` : `${tagOff}` }}
            onClick={modFilters}
            key={e.id}
            id={e.id}
          >{e.id}</div>)}

          <div className={filters.tag} onClick={setAll}>Reset</div>

        </Side>
      }
      <div className={utilStyles.title}>
        <h1>{title}</h1>
      </div>
      <div className={blog.wrapper}>

        {posts.map(({ id, title, blurb, category }) => (
          <Link href={`/posts/${id}`}>
            <a className={` ${blog.blog}`} id={themeDark && theme.darkmode} key={`${id} ${title}`}>

              <h2>{title}</h2>
              <h3>Question: </h3>
              <p>{blurb}</p>
              <p id={blog.categoryTag}>{category}</p>

            </a>
          </Link>
        ))}

      </div>

    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}