import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Services(){
    return (
        <Layout>
            <div className="container">
                <Head>
                <title>Services</title>
                <link rel="icon" href="/favicon.ico" />
                </Head>
            
                <main>
                    <h1>Services Pages</h1>
                    <p><br/> ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ <br/><Link href="/"><a>GO HOME!!</a></Link></p>
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