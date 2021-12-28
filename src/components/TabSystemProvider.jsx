import { useState } from "react"
import { topState } from "../hooks/useTabs"

/**
 * Context provider placed at the very top-level. Manages panes.
 * @param {Object} props
 * @param {array} props.initialTabs
 * @param {*} props.children
 * @returns 
 */
 export const TabSystemProvider = ({initialTabs, children}) => {
  const [panes, setPanes] = useState([{
    tabs: initialTabs,
    activeTab: 0,
  }])
  const [focusedPane, setFocusedPane] = useState(0)
  const focusPane = id => {
    setFocusedPane(id)
  }

  // console.log(panes)

  const addPane = initialTabs => {
    setPanes(cv => [...cv, {
      tabs: initialTabs,
      activeTab: 0
    }])
  }
  const removePane = paneId => {
    if(panes.length === 1) {
      setPanes([{
        tabs: [],
        activeTab: 0,
      }])
      return
    }
    setPanes(cv => [...cv.slice(0, paneId), ...cv.slice(paneId + 1)])
  }

  const addTab = (paneId, tabObject) => {

    setPanes(cv => [
      ...cv.slice(0, paneId), 
      { ...cv[paneId], tabs: [...cv[paneId].tabs, tabObject] }, 
      ...cv.slice(paneId + 1)
    ])
  }
  const setActiveTab = (paneId, tabId) => {
    setPanes(cv => [
      ...cv.slice(0, paneId), 
      { ...cv[paneId], activeTab: tabId }, 
      ...cv.slice(paneId + 1)
    ])
  }
  const removeTab = (paneId, tabId) => {
    //I would use cv here, but somehow it actually breaks the function. Idk what's going on there.
    setPanes([
      ...panes.slice(0, paneId), 
      { 
        ...panes[paneId], 
        tabs: [...panes[paneId].tabs?.slice(0, tabId), ...panes[paneId].tabs?.slice(tabId + 1)],
        activeTab: panes[paneId].activeTab === panes[paneId].tabs?.length - 1 ? panes[paneId].activeTab - 1 : panes[paneId].activeTab
      }, 
      ...panes.slice(paneId + 1)
    ])
  }

  return <topState.Provider value={{ panes, addPane, removePane, focusedPane, focusPane, addTab, removeTab, setActiveTab}}>
    {children}
  </topState.Provider>
}

export default TabSystemProvider