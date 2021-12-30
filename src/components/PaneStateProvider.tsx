import { ReactNode, useCallback, useContext } from "react"
import { paneState, topState } from "../hooks/useTabs"
import { TabType } from "../types"

/**
 * Context provider for Panes. Manages tabs.
 * @param {Object} props 
 * @param {number} props.id
 * @param {*} props.children
 * @returns 
 */

export type PaneStateProviderProps = {
  id: number,
  children: ReactNode
}
export const PaneStateProvider = ({id, children}: PaneStateProviderProps): JSX.Element => {

  const { panes, addTab, removeTab, setActiveTab } = useContext(topState)
  const tabs = panes[id].tabs
  const activeTab = panes[id].activeTab

  const paneSetActiveTab = (tabId: number) => {
    setActiveTab(id, tabId)
  }
  const paneAddTab = (tabObject: TabType) => {
    addTab(id, tabObject)
  }
  const paneRemoveTab = useCallback((i: number) => {
    if(activeTab === tabs.length - 1) {
      paneSetActiveTab(activeTab - 1 >= 0 ? activeTab - 1 : 0)
    }
    removeTab(id, i)
  }, [activeTab, paneAddTab])

  return <paneState.Provider value={{id, tabs, addTab: paneAddTab, removeTab: paneRemoveTab, activeTab, setActiveTab: paneSetActiveTab}}>
    {children}
  </paneState.Provider>
}

export default PaneStateProvider