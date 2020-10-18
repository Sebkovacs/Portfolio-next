import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function Architecture(){
    return (
        <Layout>
        <div className="container">
            <Head>
            <title>Architecture</title>
            </Head>
        
            <main>
                <h1>This is Arcitecture</h1>
                <p>🏢 🏢 🏢 🏢 </p>
                <h2><Link href="/"><a>Home World Bound</a></Link></h2>
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