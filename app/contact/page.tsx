import styles from './page.module.css'

const contactCards = [
  {
    title: 'Studio email',
    body: 'studio@sebkovacs.com',
    link: 'mailto:studio@sebkovacs.com',
  },
  {
    title: 'Call direct',
    body: '+61 432 365 389',
    link: 'tel:+61432365389',
  },
  {
    title: 'Studio location',
    body: 'Newcastle NSW — Australia',
  },
]

export default function ContactPage() {
  return (
    <section className={`page-shell ${styles.wrapper}`}>
      <div className={styles.intro}>
        <h1>Let’s collaborate on your next project</h1>
        <p>
          From hyperscale data-centre campuses to crafted coastal homes, I partner with clients across concept strategy, planning approvals and immersive visualisation. Drop a note below and I’ll respond within 48 hours.
        </p>
      </div>

      <div className={styles.cardGrid}>
        {contactCards.map((card) => (
          <div key={card.title} className={styles.card}>
            <h2 className={styles.cardTitle}>{card.title}</h2>
            {card.link ? (
              <a href={card.link} className={styles.cardBody}>
                {card.body}
              </a>
            ) : (
              <p className={styles.cardBody}>{card.body}</p>
            )}
          </div>
        ))}
      </div>

      <form className={styles.contactForm}>
        <div className={styles.field}>
          <span className={styles.label}>Name</span>
          <input className={styles.input} name="name" placeholder="Your name" />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Email</span>
          <input className={styles.input} name="email" type="email" placeholder="you@studio.com" />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Project outline</span>
          <textarea className={styles.textarea} name="message" placeholder="Tell me about your site, programme and timeline." />
        </div>
        <button type="submit" className={styles.submitButton}>
          Send enquiry
        </button>
      </form>
    </section>
  )
}
