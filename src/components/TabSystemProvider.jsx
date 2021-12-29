import { useState } from "react"
import { topState } from "../hooks/useTabs"

/**
 * Context provider placed at the very top-level. Manages panes.
 * @param {Object} props
 * @param {array} props.initialTabs
 * @param {*} props.children
 * @returns 
 */
 export const TabSystemProvider = ({initialTabs = [], children}) => {  
  const [panes, setPanes] = useState([{
    tabs: initialTabs,
    activeTab: 0,
    width: 100,
  }])
  //Idea: list of the components seperately, with a tab ID and pane ID field.
  //Moving tabs around erases their state :(
  // const [components, setComponents] = useState([])
  const [focusedPane, setFocusedPane] = useState(0)
  const focusPane = id => {
    setFocusedPane(id)
  }

  const addPane = initialTabs => {
    setPanes(cv => [...cv, {
      tabs: initialTabs,
      activeTab: 0
    }])
  }
  const addPaneAfter = (paneId, initialTabs) => {
    setPanes(cv => [
      ...cv.slice(0, paneId + 1), 
      {
        tabs: initialTabs,
        activeTab: 0
      },
      ...cv.slice(paneId + 1)
    ])
  }
  const removePane = paneId => {
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
  const moveTabBetweenPanes = (sourcePaneId, sourceTabId, destinationPaneId, destinationTabId = null) => {

    //Idea: create copies of source and destionation panes with removed items,
    //And then add the new items,
    //And then do the if statement.
    //It should be possible for it not to break when dragging onto the same tab to reorder.

    //WARNING: painful React nested array mutations incoming

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

        //Copy of the destination pane with the source tab appended onto its tab list or inserted appropriately
        {
          ...panes[destinationPaneId],
          //Is there a destionation pane specified?
          tabs: destinationTabId !== null ? [
            ...panes[destinationPaneId].tabs.slice(0, destinationTabId + 1),
            panes[sourcePaneId].tabs[sourceTabId],
            ...panes[destinationPaneId].tabs.slice(destinationTabId + 1)           
          ]
          //Otherwise, just pop it in at the end   
          : [...panes[destinationPaneId].tabs, panes[sourcePaneId].tabs[sourceTabId]]
        },

        //Right after the destionation pane onward
        ...panes.slice(destinationPaneId + 1)
      ])

    } else {

      setPanes([
        //Right up until the destination pane...
        ...panes.slice(0, destinationPaneId), 

        //Copy of the destination pane with the source tab appended onto its tab list or inserted appropriately
        {
          ...panes[destinationPaneId],
          //Is there a destionation pane specified?
          tabs: destinationTabId !== null ? [
            ...panes[destinationPaneId].tabs.slice(0, destinationTabId + 1),
            panes[sourcePaneId].tabs[sourceTabId],
            ...panes[destinationPaneId].tabs.slice(destinationTabId + 1)                  
          ]
          //Otherwise, just pop it in at the end   
          : [...panes[destinationPaneId].tabs, panes[sourcePaneId].tabs[sourceTabId]]
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
  const moveTab = (paneId, originalIndex, newIndex = null) => {

  }

  return <topState.Provider value={{ panes, addPane, addPaneAfter, removePane, focusedPane, focusPane, addTab, removeTab, setActiveTab, moveTab, moveTabBetweenPanes}}>
    {children}
  </topState.Provider>
}

export default TabSystemProvider