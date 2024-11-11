import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/LayoutFilter'
import Styles from '../styles/wedding.module.css'
import Image from 'next/image'
import gif from '../styles/gif.module.css'
import Side from '../components/Side'

import { useThemeDark } from '../context/AppContext'
import { useEffect, useState } from 'react'

const title = "Wedding"
const sidePanelHeading = "Bonus"


export default function Resume() {
    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 768) {
            setIsMobile(true)
        }
    })


    const [themeDark, setThemeDark] = useThemeDark();

    return (
        <div>
            {/* <div className={Styles.title}>

                <h1>Wedding Information Page</h1>
                <div className={`${Styles.buttons} ${Styles.pcOnly}  ${themeDark && theme.darkmodeSolid} ${themeDark && theme.darkBB1}`} >
                    <a href='/files/Resume-Sebastian-Kovacs-2022.pdf' download className={Styles.download}>Resume &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                    <a href='/files/Portfolio-Sebastian-Kovacs-2022.pdf' download className={Styles.download}>Portfolio (16mb) &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                </div>
            </div>

            <div className={`${Styles.mobileOnlyFlex}`}>
                <a href='/files/Resume-Sebastian-Kovacs-2022.pdf' download className={`${Styles.bb1} ${Styles.download} ${themeDark && theme.darkBB1}`}>Resume &nbsp;<span class="material-symbols-outlined">file_download</span></a>
                <a href='/files/Portfolio-Sebastian-Kovacs-2022.pdf' download className={`${Styles.bb1} ${Styles.download} ${themeDark && theme.darkBB1}`}>Portfolio (16mb) &nbsp;<span class="material-symbols-outlined">file_download</span></a>
            </div> */}

            <h1 className={Styles.h1}>- Wedding Information -</h1>
            <div className={` ${Styles.container} ${themeDark && theme.darkmode}`} >
                <div className={Styles.list}>
                    <h2 className={Styles.h2} id={themeDark && theme.darkText}>The Ceremony</h2>
                    <ul>
                        <li>Where: hickson st lookout</li>
                        <li>Address: 14 Hickson St, Merewether NSW 2291</li>
                        <li>Time: 3pm</li>
                        <li>Date: 11 Janurary 2025</li>
                        <li>Please arrive 2.30pm for a ceremony commencement at 3pm sharp!</li>
                        <li>Note! Its a public location so we can reserve parking, and have to share access throughout :)</li>

                    </ul>
                    <div className={`${Styles.buttons} ${Styles.pcOnly}  ${themeDark && theme.darkmodeSolid} ${themeDark && theme.darkBB1}`} >
                        <a className={Styles.button}>Add to Calendar<span class="material-symbols-outlined">event</span></a>
                        <a className={Styles.button} target="_blank" href={"https://g.co/kgs/zXvzYrw"} >Google Maps Link<span class="material-symbols-outlined">pin_drop</span></a>
                    </div>

                </div>

                <div className={Styles.list} >
                    <h2 className={Styles.h2} id={themeDark && theme.darkText}>The Reception</h2>
                    <ul>
                        <li>Where: The Edwards</li>
                        <li>Address: 148 Parry St, Newcastle West NSW 2302</li>
                        <li>Time: 5pm-11pm kick out</li>
                        <li>Date: 11 Janurary 2025</li>
                        <li>Smart Casual Dress</li>
                        <li>Grazing table and capaes :)</li>
                        <li>speaches at 7pm</li>
                    </ul>
                    <div className={`${Styles.buttons} ${Styles.pcOnly}  ${themeDark && theme.darkmodeSolid} ${themeDark && theme.darkBB1}`} >
                        <a className={Styles.button} target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=M2toaHFtMHYzbGIyYXY5cXQ3Z2RqMGlxcTggc2Via292YWNzQG0&tmsrc=sebkovacs%40gmail.com">Add to Calendar<span class="material-symbols-outlined">event</span></a>
                        <a className={Styles.button} target="_blank" href={"https://g.co/kgs/HmRKdSf"} >Google Maps Link<span class="material-symbols-outlined">pin_drop</span></a>
                    </div>
                </div>
                <div className={Styles.list} >
                    <h2 className={Styles.h2} id={themeDark && theme.darkText}>Q & A</h2>


                    <p>For all our friends and family who have lots of questions, please check out our Q&A.</p>

                    <h3>When is the RSVP deadline?</h3>
                    <p>RSVP by 1 August 2024 for catering purposes.</p>

                    <h3>Can I bring a date?</h3>
                    <p>We are looking forward to celebrating with our family and closest friends. People named on the invitation are invited only.</p>

                    <h3>Can I bring my kids?</h3>
                    <p>As much as we love your little ones, unfortunately we are only able to accommodate the children in the wedding party. Thanks for your understanding and enjoy the night off. Drinks are on us!</p>

                    <h3>What will the weather be like?</h3>
                    <p>Hopefully it's a beautiful spring Newcastle day. It can get windy close to the beach, so you may wish to bring a jacket. In the event of wet weather, guests will be notified by email and the ceremony will be held at Noah's on the Beach.</p>

                    <h3>Where should I park?</h3>
                    <p>If driving, allow additional time for parking. We recommend utilising public transport for at least part of your journey, as the Newcastle Beach light rail stop is right next to Pacific Park, and close to Noah's.</p>

                    <p>Parking at Noah's is **shared with the public**. </p>

                    <h3>What should I wear?</h3>
                    <p>Something you feel great in! Dress to impress (semi-formal or cocktail attire).</p>

                    <h3>Is the wedding indoors or outdoors?</h3>
                    <p>Our wedding ceremony will be held outside, under the big fig tree at the southern end of Pacific Park.</p>

                    <p>The reception will be indoors at Noah's on the Beach. In the event of wet weather, both the ceremony and reception will be held inside Noah's.</p>

                    <h3>Is it okay to take pictures with our phones and cameras during the wedding?</h3>
                    <p>Our photographer is amazing, and we'd love you to be present in the moment with us. Please refrain from taking photos during the ceremony. You're welcome to take and share happy snaps at the reception.</p>

                    <h3>Is there a gifts registry?</h3>
                    <p>Your presence is the best present of all! If you wish to help us celebrate with a gift, we'd greatly appreciate any contributions towards our future together.</p>

                    <p>A wishing well will be available on the night or if it's more convenient, please feel free to use the following PayID details</p>
                </div>


            </div>

        </div>

    )
}