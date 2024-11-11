// File path: /pages/wedding.js

import Styles from '../styles/wedding.module.css';
import Image from 'next/image';

const title = "Wedding";
const sidePanelHeading = "Bonus";

export default function Wedding() {
    return (
        <div>
            <h1 className={Styles.h1}>- Wedding Information -</h1>
            <div className={Styles.container}>

                {/* Ceremony Details */}
                <div className={Styles.list}>
                    <Image 
                        src="/hickson_lookout.jpg"
                        alt="Ceremony Location - Hickson St Lookout"
                        width={1265}
                        height={560}
                        layout="responsive"
                        className={Styles.image}
                        priority
                    />
                    <h2 className={Styles.h2}>The Ceremony</h2>
                    
                    <h3>Where</h3>
                    <p>Hickson St Lookout</p>

                    <h3>Address</h3>
                    <p>14 Hickson St, Merewether NSW 2291</p>

                    <h3>Time</h3>
                    <p>3pm</p>

                    <h3>Date</h3>
                    <p>11 January 2025</p>

                    <h3>Additional Details</h3>
                    <p>Please arrive by 2:30pm for a 3pm sharp start! Note: It's a public location, so parking is not reserved, and access is shared.</p>

                    <div className={`${Styles.buttons} ${Styles.pcOnly}`}>
                        <a className={Styles.button}>Add to Calendar <span className="material-symbols-outlined">event</span></a>
                        <a className={Styles.button} target="_blank" href="https://g.co/kgs/zXvzYrw">Google Maps Link <span className="material-symbols-outlined">pin_drop</span></a>
                    </div>
                </div>

                {/* Reception Details */}
                <div className={Styles.list}>
                    <Image 
                        src="/the_edwards_front.png"
                        alt="Reception Location - The Edwards"
                        width={1680}
                        height={560}
                        layout="responsive"
                        className={Styles.image}
                        priority
                    />
                    <h2 className={Styles.h2}>The Reception</h2>
                    
                    <h3>Where</h3>
                    <p>The Edwards</p>

                    <h3>Address</h3>
                    <p>148 Parry St, Newcastle West NSW 2302</p>

                    <h3>Time</h3>
                    <p>5pm - 11pm</p>

                    <h3>Date</h3>
                    <p>11 January 2025</p>

                    <h3>Dress Code</h3>
                    <p>Smart Casual</p>

                    <h3>Additional Details</h3>
                    <p>Grazing table and canapés will be served. Speeches at 7pm.</p>

                    <div className={`${Styles.buttons} ${Styles.pcOnly}`}>
                        <a className={Styles.button} target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=M2toaHFtMHYzbGIyYXY5cXQ3Z2RqMGlxcTggc2Via292YWNzQG0&tmsrc=sebkovacs%40gmail.com">Add to Calendar <span className="material-symbols-outlined">event</span></a>
                        <a className={Styles.button} target="_blank" href="https://g.co/kgs/HmRKdSf">Google Maps Link <span className="material-symbols-outlined">pin_drop</span></a>
                    </div>
                </div>

                {/* Q&A Section */}
                <div className={Styles.list}>
                    <h2 className={Styles.h2}>Q & A</h2>
                    
                    <h3>When is the RSVP deadline?</h3>
                    <p>RSVP by 1 August 2024 for catering purposes.</p>

                    <h3>Can I bring a date?</h3>
                    <p>We are celebrating with close family and friends. Only those named on the invitation are invited.</p>

                    <h3>Can I bring my kids?</h3>
                    <p>Only children in the wedding party are invited. Enjoy the night off—drinks are on us!</p>

                    <h3>What will the weather be like?</h3>
                    <p>Hopefully sunny! It may be windy near the beach, so bring a jacket. In case of rain, the ceremony will move to Noah's on the Beach.</p>

                    <h3>Where should I park?</h3>
                    <p>If driving, allow time for parking or consider public transport. The Newcastle Beach light rail stop is nearby.</p>

                    <h3>What should I wear?</h3>
                    <p>Dress to impress (semi-formal or cocktail attire).</p>

                    <h3>Is the wedding indoors or outdoors?</h3>
                    <p>The ceremony is outdoors at Pacific Park. The reception will be indoors at Noah's on the Beach.</p>

                    <h3>Is it okay to take pictures during the wedding?</h3>
                    <p>We prefer no photos during the ceremony. Feel free to take photos at the reception!</p>

                    <h3>Is there a gifts registry?</h3>
                    <p>Your presence is the best gift! Contributions towards our future are appreciated; a wishing well will be available on the night.</p>
                </div>
            </div>
        </div>
    );
}
