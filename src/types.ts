export type TabType = {
  title: string
  content: JSX.Element
}

export type PaneType = {
  tabs: TabType[]
  activeTab: number
}
