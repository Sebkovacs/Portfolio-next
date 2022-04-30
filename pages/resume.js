import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'

const title = "Resume"

export default function Resume() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle} {' | '} {title}</title>
            </Head>
                <h1>Resume Summary</h1>

                <div className={utilStyles.padding}>

                    <div className={utilStyles.flex}>
                        <div className={utilStyles.list}>
                            <h3>Relevant Work History</h3>
                            <ul>
                                <li>Side Jobs 2021 - Present</li>
                                <li>Jason Topics Architecture 2018-2020</li>
                                <li>Carpentry (Paul Hickson Builder) 2017-2018</li>
                                <li>Construction (North) 2016-2017</li>
                            </ul>
                        </div>

                        <div className={utilStyles.list}>
                            <h3>Education / Qualifications</h3>
                            <ul>
                                <li>2020 Masters Architecture</li>
                            </ul>
                        </div>

                        <div className={utilStyles.list}>

                            <h3>Software</h3>
                            
                            <h4>Drafting / BIM</h4>
                            <ul>
                                <li>Revit</li>
                                <li>Vectorworks</li>
                            </ul>

                            <h4> Rendering</h4>
                            <ul>
                            <li>Vray</li>
                            <li>Twinmotion </li>
                            <li>Lumion</li>
                            </ul>
                            
                            <h4>Other</h4>
                            <ul>
                            <li>Adobe Photoshop</li>
                            <li>Adobe Illustrator </li>
                            <li>Adobe InDesign</li>
                            <li>Google Office Suite</li>
                            </ul>

                            
                        </div>

                        <div className={utilStyles.list}>
                            <h3>Other Skills / Proficiencies</h3>
                            <ul>
                                <li>Digital Marketing</li>
                                <li>B2B Sales</li>
                                <li>Web Development</li>
                            </ul>
                        </div>




                    </div>
                </div>

        </Layout>

    )
}