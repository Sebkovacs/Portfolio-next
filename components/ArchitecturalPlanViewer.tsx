"use client"
import Image from 'next/image'
import { useState } from 'react'
import styles from './ArchitecturalPlanViewer.module.css'

export type PlanItem = {
  id: number | string
  plan: string
  alt: string
}

type Props = {
  projectTitle: string
  shortTitle: string
  plans: PlanItem[]
  north?: number
}

export default function ArchitecturalPlanViewer({ projectTitle, shortTitle, plans, north }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  if (!plans || plans.length === 0) return null

  const currentPlan = plans[selectedIndex] || plans[0]

  return (
    <div className={styles.viewerWrapper}>
      {/* Plan Header & Controls */}
      <div className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <div className={styles.kickerGroup}>
            <span className="badge-arch badge-accent">Technical Drawings</span>
            {north !== undefined && (
              <span className="badge-arch">
                <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', transform: `rotate(${north}deg)` }}>
                  navigation
                </span>
                <span>North: {north}&deg;</span>
              </span>
            )}
          </div>
          <h2 className={styles.sectionHeading}>Architectural Plans &amp; Sections</h2>
        </div>

        {/* Drawing Tabs if multiple plans exist */}
        {plans.length > 1 && (
          <div className={styles.planTabs}>
            {plans.map((pl, idx) => (
              <button
                key={pl.id}
                type="button"
                className={`${styles.tabBtn} ${selectedIndex === idx ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedIndex(idx)}
              >
                <span className={styles.tabIndex}>0{idx + 1}</span>
                <span className={styles.tabLabel}>{pl.alt || `Sheet ${idx + 1}`}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Drawing Stage */}
      <div className={styles.drawingStage}>
        {/* Drawing Title Block Banner */}
        <div className={styles.titleBlockBar}>
          <div className={styles.drawingInfo}>
            <span className={styles.drawingNumber}>DWG 0{selectedIndex + 1} OF 0{plans.length}</span>
            <strong className={styles.drawingTitle}>{currentPlan.alt || 'Architectural Floor Plan'}</strong>
          </div>

          <div className={styles.drawingMeta}>
            <span className={styles.metaPill}>Studio: Salt &amp; Stone</span>
            <button
              type="button"
              className={styles.fullscreenBtn}
              onClick={() => setIsLightboxOpen(true)}
              title="Expand Drawing Fullscreen"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>zoom_in</span>
              <span>Expand Drawing</span>
            </button>
          </div>
        </div>

        {/* Crisp Drawing Canvas Container */}
        <div className={styles.canvasContainer} onClick={() => setIsLightboxOpen(true)}>
          <div className={styles.gridBackground} />
          <div className={styles.imageWrapper}>
            <Image
              src={`/projects/${shortTitle}${currentPlan.plan}`}
              alt={currentPlan.alt || `${projectTitle} Architectural Drawing`}
              fill
              sizes="(min-width: 1200px) 1100px, 100vw"
              className={styles.drawingImage}
              priority
            />
          </div>
          <div className={styles.clickToZoomBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>fullscreen</span>
            <span>Click to inspect drawing</span>
          </div>
        </div>

        {/* Drawing Footer Notes */}
        <div className={styles.stageFooter}>
          <p className={styles.drawingNotes}>
            Precision BIM drawing documentation illustrating spatial hierarchy, solar penetration, and structural grids.
          </p>
          <span className={styles.scaleNotation}>CAD / Vector Documentation</span>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className={styles.lightboxBackdrop} onClick={() => setIsLightboxOpen(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxHeader}>
              <strong className={styles.lightboxTitle}>{currentPlan.alt || `${projectTitle} Drawing`}</strong>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close fullscreen drawing"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={`/projects/${shortTitle}${currentPlan.plan}`}
                alt={currentPlan.alt || projectTitle}
                fill
                sizes="100vw"
                className={styles.lightboxImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
