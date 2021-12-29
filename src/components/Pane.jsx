import { Close } from "@material-ui/icons"
import React, { useContext } from "react"
import { paneState, topState, Tab } from "../hooks/useTabs"

/**
 * Only used by useTabs.
 * @returns 
 */
export const Pane = () => {

  const {id, tabs, addTab, removeTab, activeTab, setActiveTab} = useContext(paneState)
  const {removePane, focusedPane, focusPane, moveTab, moveTabBetweenPanes} = useContext(topState)
  
  const handleClose = (e, i) => {
    e.stopPropagation()
    removeTab(i)
  }
  const handleClick = (e, i) => {
    setActiveTab(i)
  }

  const handlePaneClose = (e) => {
    e.stopPropagation()
    removePane(id)
  }

  const handleTabButtonDrag = (e, tabId) => {
    e.dataTransfer.setData("tab", JSON.stringify({tabId, paneId: id}))
  }

  const handleEndDrop = e => {
    const { tabId, paneId } = JSON.parse(e.dataTransfer.getData("tab")) 

    //Reorder tab
    if(paneId === id) {
      moveTab(id, tabId, tabs.length - 1)
      return
    }

    //Move between panes
    moveTabBetweenPanes(paneId, tabId, id)
  }

  const handleTabDrop = (e, i) => {
    e.stopPropagation()

    const { tabId, paneId } = JSON.parse(e.dataTransfer.getData("tab"))

    //Reorder tab
    if(paneId === id) {
      moveTab(id, tabId, i)
      return
    }

    //Move between panes
    moveTabBetweenPanes(paneId, tabId, id, i)
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  return (<div key={id} className={`pane ${focusedPane === id && 'focused'}`} onClick={() => focusPane(id)} onDragOver={handleDragOver} >
    <div className="topBar" onDrop={handleEndDrop}>
      {tabs?.map((tab, i) => 
        <div key={i} className={`tabButton ${i === activeTab && 'active'}`} onClick={e => handleClick(e, i)} draggable onDragStart={e => handleTabButtonDrag(e, i)} onDragOver={handleDragOver} onDrop={e => handleTabDrop(e, i)}>
          <span className="title">{tab.title}</span>
          <div className="closeButton" onClick={e => handleClose(e, i)}><Close /></div>
        </div>
      )}

      <div className="paneCloseButton" onClick={handlePaneClose}>
        <Close />
      </div>
    </div>
    {tabs?.length > 0 ?
      tabs[activeTab]?.content? <Tab content={tabs[activeTab].content} /> : <></>
    : <></>}
  </div>)

}

export default Pane