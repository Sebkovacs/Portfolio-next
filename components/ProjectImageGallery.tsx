"use client"
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import styles from './ProjectImageGallery.module.css'

export type GalleryImage = {
  id: number | string
  image: string
  alt: string
  caption?: string
}

type Props = {
  projectTitle: string
  shortTitle: string
  images: GalleryImage[]
}

export default function ProjectImageGallery({ projectTitle, shortTitle, images }: Props) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null)

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return
    setActiveLightboxIndex((prev) => ((prev ?? 0) + 1) % images.length)
  }, [activeLightboxIndex, images.length])

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return
    setActiveLightboxIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length)
  }, [activeLightboxIndex, images.length])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return
      if (e.key === 'Escape') setActiveLightboxIndex(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    },
    [activeLightboxIndex, handleNext, handlePrev]
  )

  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeLightboxIndex, handleKeyDown])

  if (!images || images.length === 0) return null

  const heroImage = images[0]
  const secondaryImages = images.slice(1)

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.galleryHeader}>
        <div className={styles.headerTitleGroup}>
          <span className="badge-arch badge-accent">Visual Documentation</span>
          <h2 className={styles.sectionHeading}>Spatial Journey &amp; Material Craft</h2>
        </div>
        <span className={styles.photoCount}>
          {images.length} {images.length === 1 ? 'Photograph' : 'Photographs & Perspectives'}
        </span>
      </div>

      {/* Flagship Hero Image */}
      <figure className={styles.heroFigure} onClick={() => setActiveLightboxIndex(0)}>
        <div className={styles.heroImgContainer}>
          <Image
            src={`/projects/${shortTitle}${heroImage.image}`}
            alt={heroImage.alt || heroImage.caption || `${projectTitle} Flagship View`}
            fill
            sizes="(min-width: 1200px) 1280px, 100vw"
            priority
            className={styles.heroImg}
          />
          <div className={styles.overlayPill}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>fullscreen</span>
            <span>Inspect Fullscreen</span>
          </div>
        </div>
        {(heroImage.caption || heroImage.alt) && (
          <figcaption className={styles.heroCaption}>
            <span className={styles.captionTag}>01 · Flagship Perspective</span>
            <p className={styles.captionText}>{heroImage.caption || heroImage.alt}</p>
          </figcaption>
        )}
      </figure>

      {/* Secondary Asymmetric Editorial Grid */}
      {secondaryImages.length > 0 && (
        <div className={styles.secondaryGrid}>
          {secondaryImages.map((pic, idx) => {
            const globalIndex = idx + 1
            const isFullWidth = (idx + 1) % 3 === 0

            return (
              <figure
                key={pic.id}
                className={`${styles.figure} ${isFullWidth ? styles.figureFull : ''}`}
                onClick={() => setActiveLightboxIndex(globalIndex)}
              >
                <div className={`${styles.imgContainer} ${isFullWidth ? styles.imgContainerWide : ''}`}>
                  <Image
                    src={`/projects/${shortTitle}${pic.image}`}
                    alt={pic.alt || pic.caption || `${projectTitle} view ${globalIndex + 1}`}
                    fill
                    sizes={isFullWidth ? '(min-width: 1200px) 1280px, 100vw' : '(min-width: 1200px) 620px, 50vw'}
                    className={styles.img}
                  />
                  <div className={styles.hoverOverlay}>
                    <span className="material-symbols-outlined">zoom_in</span>
                  </div>
                </div>
                {(pic.caption || pic.alt) && (
                  <figcaption className={styles.caption}>
                    <span className={styles.captionTag}>0{globalIndex + 1}</span>
                    <p className={styles.captionText}>{pic.caption || pic.alt}</p>
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Carousel */}
      {activeLightboxIndex !== null && (
        <div className={styles.lightboxBackdrop} onClick={() => setActiveLightboxIndex(null)}>
          <div className={styles.lightboxModal} onClick={(e) => e.stopPropagation()}>
            {/* Top Bar */}
            <div className={styles.lightboxTopBar}>
              <div className={styles.lightboxTitleInfo}>
                <span className={styles.lightboxCounter}>
                  {String(activeLightboxIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
                <strong className={styles.lightboxProjectTitle}>{projectTitle}</strong>
              </div>

              <div className={styles.lightboxControls}>
                <button
                  type="button"
                  onClick={handlePrev}
                  className={styles.navBtn}
                  aria-label="Previous photograph"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className={styles.navBtn}
                  aria-label="Next photograph"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  className={styles.closeBtn}
                  aria-label="Close fullscreen gallery"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Stage */}
            <div className={styles.lightboxStage}>
              <Image
                src={`/projects/${shortTitle}${images[activeLightboxIndex].image}`}
                alt={images[activeLightboxIndex].alt || projectTitle}
                fill
                sizes="100vw"
                className={styles.lightboxImg}
                priority
              />
            </div>

            {/* Bottom Caption */}
            {(images[activeLightboxIndex].caption || images[activeLightboxIndex].alt) && (
              <div className={styles.lightboxBottomBar}>
                <p className={styles.lightboxCaption}>
                  {images[activeLightboxIndex].caption || images[activeLightboxIndex].alt}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
