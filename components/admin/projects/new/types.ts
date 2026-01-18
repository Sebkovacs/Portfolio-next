export type MessageState = { text: string; tone: 'success' | 'error' }
export type ExistingMeta = { ids: Set<string>; shortTitles: Set<string> }
export type ActivityEntry = { slug: string; shortTitle: string; title: string; timestamp: string; assetsFolder: string }
export type DraftState = { title: string; shortTitle: string; date: string }
export type HomeSectionKey = 'selected' | 'themes' | 'portfolios'
