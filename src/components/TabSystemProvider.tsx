import { useState, ReactNode } from "react"
import { v4 } from "uuid"

import { topState } from "../hooks/useTabs"
import { TabType, PaneType, NewTab } from "../types"

/**
 * Context provider placed at the very top-level. Manages panes.
 * @param {Object} props
 * @param {array} props.initialTabs
 * @param {*} props.children
 * @returns 
 */
 export const TabSystemProvider = ({initialTabs = [], children}: { initialTabs: NewTab[], children: ReactNode }) => {

  const [panes, setPanes] = useState<PaneType[]>([{
    tabs: initialTabs.map(tab => ({...tab, key: v4() })),
    activeTab: 0,
  }])
  const [paneWidths, setPaneWidths] = useState<number[]>([100])
  //Idea: list of the components seperately, with a tab ID and pane ID field.
  //Moving tabs around erases their state :(
  // const [components, setComponents] = useState([])
  const [focusedPane, setFocusedPane] = useState(0)
  const focusPane = (id: number) => {
    setFocusedPane(id)
  }

  const addPane = (initialTabs: NewTab[]) => {
    setPanes(cv => [...cv, {
      tabs: initialTabs.map(tab => ({ ...tab, key: v4() })),
      activeTab: 0
    }])
  }
  const addPaneAfter = (paneId: number, initialTabs: NewTab[]) => {
    setPanes(cv => [
      ...cv.slice(0, paneId + 1), 
      {
        tabs: initialTabs.map(tab => ({ ...tab, key: v4() })),
        activeTab: 0
      } as PaneType,
      ...cv.slice(paneId + 1)
    ])
  }
  const removePane = (paneId: number) => {
    //Make sure to never have zero panes
    if(panes.length === 1) {
      setPanes([{
        tabs: [],
        activeTab: 0,
      }])
      return
    }
    //Adjust focused pane and remove the pane
    setFocusedPane(focusedPane === panes.length - 1 ? focusedPane - 1 : focusedPane)
    setPanes([...panes.slice(0, paneId), ...panes.slice(paneId + 1)])
  }

  const addTab = (paneId: number, tabObject: NewTab[]) => {
    setPanes(cv => [
      ...cv.slice(0, paneId), 
      { ...cv[paneId], tabs: [...cv[paneId].tabs, {...tabObject, key: v4()}] } as PaneType, 
      ...cv.slice(paneId + 1)
    ])
  }
  const setActiveTab = (paneId: number, tabId: number) => {
    setPanes(cv => [
      ...cv.slice(0, paneId), 
      { ...cv[paneId], activeTab: tabId }, 
      ...cv.slice(paneId + 1)
    ])
  }
  const removeTab = (paneId: number, tabId: number) => {
    if(panes[paneId].tabs.length === 1 && panes.length > 1) {
      removePane(paneId)
      return
    }
    setPanes([
      ...panes.slice(0, paneId), 
      { 
        ...panes[paneId], 
        tabs: [...panes[paneId].tabs.slice(0, tabId), ...panes[paneId].tabs.slice(tabId + 1)],
        activeTab: panes[paneId].activeTab > 0 ? ( panes[paneId].activeTab === panes[paneId].tabs.length - 1 ? panes[paneId].activeTab - 1 : panes[paneId].activeTab ) : 0
      }, 
      ...panes.slice(paneId + 1)
    ])
  }
  const moveTabBetweenPanes = (sourcePaneId: number, sourceTabId: number, destinationPaneId: number, destinationTabId: number = -1) => {

    //WARNING: painful React nested array mutations incoming
    const getNewTabList = (list: TabType[] = panes[destinationPaneId].tabs) => destinationTabId !== -1
      ? [ ...list.slice(0, destinationTabId), panes[sourcePaneId].tabs[sourceTabId], ...list.slice(destinationTabId) ] 
      : [ ...list, panes[sourcePaneId].tabs[sourceTabId]]

      // type PaneJoinTable = {
      //   tabId: string// uuid,
      //   paneIndex: number,
      //   tabIndex: number
      // }
      // type TabNew = {
      //   title: string,
      //   content: JSX.Element
      // }

      // // pane hash

      // type State = {
      //   tabs: { [key: string]: TabNew }
      // }
      
    if(sourcePaneId < destinationPaneId) {

      setPanes([
        //Up until the source pane...
        ...panes.slice(0, sourcePaneId), 

        //Copy of the source pane, but with the source tab cut out of the array and activeTab adjusted accordingly
        { 
          ...panes[sourcePaneId], 
          tabs: [
            ...panes[sourcePaneId].tabs.slice(0, sourceTabId), 
            ...panes[sourcePaneId].tabs.slice(sourceTabId + 1)
          ],
          activeTab: panes[sourcePaneId].activeTab > 0 ? ( panes[sourcePaneId].activeTab === panes[sourcePaneId].tabs.length - 1 ? panes[sourcePaneId].activeTab - 1 : panes[sourcePaneId].activeTab ) : 0
        }, 

        //Right after the source pane right up until the destination pane
        ...panes.slice(sourcePaneId + 1, destinationPaneId),

        //Copy of the destination pane with the source tab appended onto its tab list or inserted appropriately, and focus the new tab
        {
          ...panes[destinationPaneId],
          //Is there a destination tab specified?
          tabs: getNewTabList(),
          //not length - 1, because the destination does not technically have the tab yet
          activeTab: destinationTabId !== -1 ? destinationTabId : panes[destinationPaneId].tabs.length,
        },

        //Right after the destionation pane onward
        ...panes.slice(destinationPaneId + 1)
      ])

    } else {

      setPanes([
        //Right up until the destination pane...
        ...panes.slice(0, destinationPaneId), 

        //Copy of the destination pane with the source tab appended onto its tab list or inserted appropriately, and focus the new tab
        {
          ...panes[destinationPaneId],
          //Is there a destination tab specified?
          tabs: destinationTabId !== -1 ? [
            ...panes[destinationPaneId].tabs.slice(0, destinationTabId),
            panes[sourcePaneId].tabs[sourceTabId],
            ...panes[destinationPaneId].tabs.slice(destinationTabId)                  
          ]
          //Otherwise, just pop it in at the end   
          : [...panes[destinationPaneId].tabs, panes[sourcePaneId].tabs[sourceTabId]],

          //not length - 1, because the destination does not technically have the tab yet
          activeTab: destinationTabId !== -1 ? destinationTabId : panes[destinationPaneId].tabs.length,
        },

        //Right after the destination pane up until the source pane...
        ...panes.slice(destinationPaneId + 1, sourcePaneId),

        //Copy of the source pane with the source tab cut out of the array, and activeTab adjusted accordingly
        { 
          ...panes[sourcePaneId], 
          tabs: [
            ...panes[sourcePaneId].tabs.slice(0, sourceTabId),
            ...panes[sourcePaneId].tabs.slice(sourceTabId + 1)
          ],
          activeTab: panes[sourcePaneId].activeTab > 0 ? ( panes[sourcePaneId].activeTab === panes[sourcePaneId].tabs.length - 1 ? panes[sourcePaneId].activeTab - 1 : panes[sourcePaneId].activeTab ) : 0
        }, 

        //Right after the sourcePane onward
        ...panes.slice(sourcePaneId + 1)
      ])

    }
  }
  const moveTab = (paneId: number, originalIndex: number, newIndex: number) => {

    if(newIndex > originalIndex) {

      setPanes([
        ...panes.slice(0, paneId),
        {
          ...panes[paneId],
          tabs: [
            ...panes[paneId].tabs.slice(0, originalIndex),
            ...panes[paneId].tabs.slice(originalIndex + 1, newIndex),
            panes[paneId].tabs[originalIndex],
            ...panes[paneId].tabs.slice(newIndex)
          ],
          activeTab: newIndex < panes[paneId].tabs.length ? newIndex : panes[paneId].tabs.length - 1
        },
        ...panes.slice(paneId + 1),
      ])

    } else {

      setPanes([
        ...panes.slice(0, paneId),
        {
          ...panes[paneId],
          tabs: [
            ...panes[paneId].tabs.slice(0, newIndex),
            panes[paneId].tabs[originalIndex],
            ...panes[paneId].tabs.slice(newIndex, originalIndex),
            ...panes[paneId].tabs.slice(originalIndex + 1)
          ],
          activeTab: newIndex < panes[paneId].tabs.length ? newIndex : panes[paneId].tabs.length - 1
        },
        ...panes.slice(paneId + 1),
      ])

    }

  }

  return <topState.Provider value={{ panes, paneWidths, addPane, addPaneAfter, removePane, focusedPane, focusPane, addTab, removeTab, setActiveTab, moveTab, moveTabBetweenPanes}}>
    {children}
  </topState.Provider>
}

export default TabSystemProvider