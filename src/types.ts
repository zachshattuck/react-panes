export type TabType = {
  title: string
  content: JSX.Element
  key: string
}

export type NewTab = Omit<TabType, 'key'>

export type PaneType = {
  tabs: TabType[]
  activeTab: number
}
