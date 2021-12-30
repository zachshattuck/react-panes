import React, { useContext } from "react"
import { paneState, topState } from "../hooks/useTabs"

/**
 * Context provider for Panes. Manages tabs.
 * @param {Object} props 
 * @param {number} props.id
 * @param {*} props.children
 * @returns 
 */
 export const PaneStateProvider = ({id, children}) => {

  const { panes, addTab, removeTab, setActiveTab } = useContext(topState)
  const tabs = panes[id].tabs
  const activeTab = panes[id].activeTab

  const paneSetActiveTab = tabId => {
    setActiveTab(id, tabId)
  }
  const paneAddTab = tabObject => {
    addTab(id, tabObject)
  }
  const paneRemoveTab = i => {
    if(activeTab === tabs.length - 1) {
      setActiveTab(cv => (cv - 1 >= 0 ? cv - 1 : 0) )
    }
    removeTab(id, i)
  }

  return <paneState.Provider value={{id, tabs, addTab: paneAddTab, removeTab: paneRemoveTab, activeTab, setActiveTab: paneSetActiveTab}}>
    {children}
  </paneState.Provider>
}

export default PaneStateProvider