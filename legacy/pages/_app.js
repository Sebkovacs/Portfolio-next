import { AppWrapper } from '../context/AppContext'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return (
        <AppWrapper>
                <Component {...pageProps} />
        </AppWrapper>
    )
}