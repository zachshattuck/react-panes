import React, { useContext } from "react"
import '../components/css/Tabs.scss'
import { TabType, PaneType } from '../types'

export type TabSystemContext = {
  panes: PaneType[],
  paneWidths: number[],
  addPane: (initialTabs: TabType[]) => void
  addPaneAfter: (id: number, initialTabs: TabType[]) => void
  removePane: (id: number) => void
  focusedPane: number
  focusPane: (id: number) => void
  addTab: (paneId: number, tab: TabType) => void
  removeTab: (paneId: number, tabId: number) => void
  moveTab: (paneId: number, originalIndex: number, newIndex: number) => void
  moveTabBetweenPanes: (sourcePaneId: number, sourceTabId: number, destinationPaneId: number, destinationTabId?: number) => void
  setActiveTab: (paneId: number, tabId: number) => void
}


/**
 * How to use the tab system
 * Implement a TabView wrapped in a TabSystemProvider. That's it.
 * Utilize control functions by calling useTabFunctions() via any component that is nested within the TabSystemProvider.
 */

const initialState = {
  panes: [], //Array of arrays of tabs
  paneWidths: [],
  addPane: () => {},
  addPaneAfter: () => {},
  removePane: () => {},
  focusedPane: 0,
  focusPane: () => {},
  addTab: () => {},
  removeTab: () => {},
  moveTab: () => {},
  moveTabBetweenPanes: () => {},
  setActiveTab: () => {}
}
export const topState = React.createContext<TabSystemContext>(initialState)

export type PaneProviderContext = {
  id: number,
  tabs: TabType[],
  addTab: (tab: TabType) => void
  removeTab: (id: number) => void
  activeTab: number
  setActiveTab: (id: number) => void
}

const initialPaneState = {
  id: 0,
  tabs: [],
  addTab: () => {},
  removeTab: () => {},
  activeTab: 0,
  setActiveTab: () => {},
}
export const paneState = React.createContext<PaneProviderContext>(initialPaneState)


/**
 * Provides helper functions to work with the tab an arbitrary component is in.
 * @returns Helper functions 
 */
 export const useTabFunctions = () => {
  //Top-level stuff
  const {addTab, panes, addPane, focusedPane, focusPane, setActiveTab} = useContext(topState)
  /**
   * Adds a tab to the currently focused Pane.
   * @param {*} component 
   * @param {string} title 
   */
  const addNewTab = (component: JSX.Element, title = "New Tab") => {
    addTab(focusedPane, {title, content: component})
  }
  
  /**
   * Adds a tab to the currently focused Pane, and focuses it.
   * @param {*} component 
   * @param {string} title 
   */
  const addTabAndFocus = (component: JSX.Element, title = "New Tab") => {
    addTab(focusedPane, {title, content: component})
    setActiveTab(focusedPane, panes[focusedPane].tabs.length)
  }

  /**
   * Adds a new tab to a new Pane
   */
  const addTabToNewPane = (component: JSX.Element, title = "New Tab") => {
    addPane([{title, content: component}])
    focusPane(panes.length)
  }

  //TODO:
  //Open in new pane?
  //Open solo tab?
  //Replace current tab?
  //Open in new window?
  return { addTab: addNewTab, addTabAndFocus, addTabToNewPane}
}

export { default as Tab } from '../components/Tab'
export { default as TabSystemProvider } from '../components/TabSystemProvider'
export { default as Pane } from '../components/Pane'
export { default as PaneStateProvider } from '../components/PaneStateProvider'
export { default as TabView } from '../components/TabView'