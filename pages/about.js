import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function About(){
    return (
        <Layout>
            <div className="container">
                <Head>
                <title>About Me</title>
                <link rel="icon" href="/favicon.ico" />
                </Head>
            
                <main>
                    <h1>Hello ME</h1>
                    <p>🧀🧀🧀🧀🧀🧀</p>
                    <h2><Link href="/"><a>ET Phone Home</a></Link></h2>
                    <Link href="/services"><a>Services</a></Link>
                    <Link href="/about"><a>About</a></Link>
                    <ul>
                        <Link href="services/architecture"><a><li>Architecture</li></a></Link>
                        <li>Development</li>
                        <li>Feasibility</li>
                    </ul>
                </main>
            </div>
        </Layout>

    )
}