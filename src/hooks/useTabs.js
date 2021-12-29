import React, { useContext } from "react"
import '../components/css/Tabs.scss'

/**
 * How to use the tab system
 * Implement a TabView wrapped in a TabSystemProvider. That's it.
 * Utilize control functions by calling useTabFunctions() via any component that is nested within the TabSystemProvider.
 */

const initialState = {
  panes: [], //Array of arrays of tabs
  addPane: () => {},
  removePane: () => {},
  focusedPane: 0,
  focusPane: () => {},
  addTab: () => {},
  removeTab: () => {},
  moveTab: () => {},
  moveTabBetweenPanes: () => {},
}
export const topState = React.createContext(initialState)


const initialPaneState = {
  id: 0,
  tabs: [],
  addTab: () => {},
  removeTab: () => {},
  activeTab: 0,
  setActiveTab: () => {},
}
export const paneState = React.createContext(initialPaneState)


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
  const addNewTab = (component, title = "New Tab") => {
    addTab(focusedPane, {title, content: component})
  }
  
  /**
   * Adds a tab to the currently focused Pane, and focuses it.
   * @param {*} component 
   * @param {string} title 
   */
  const addTabAndFocus = (component, title = "New Tab") => {
    addTab(focusedPane, {title, content: component})
    setActiveTab(focusedPane, panes[focusedPane].tabs.length)
  }

  /**
   * Adds a new tab to a new Pane
   */
  const addTabToNewPane = (component, title = "New Tab") => {
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

export * from '../components/Tab'
export * from '../components/TabSystemProvider'
export * from '../components/Pane'
export * from '../components/PaneStateProvider'
export * from '../components/TabView'