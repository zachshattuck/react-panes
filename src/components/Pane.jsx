import { Add, Close } from "@material-ui/icons"
import React, { useContext } from "react"
import { paneState, topState, Tab } from "../hooks/useTabs"

/**
 * Only used by useTabs.
 * @returns 
 */
export const Pane = ({width = 100}) => {

  const {id, tabs, removeTab, activeTab, setActiveTab} = useContext(paneState)
  const {addPaneAfter, removePane, focusedPane, focusPane, moveTab, moveTabBetweenPanes} = useContext(topState)
  
  const handleClose = (e, i) => {
    e.stopPropagation()
    removeTab(i)
  }
  const handleClick = (e, i) => {
    setActiveTab(i)
  }

  const handlePaneAdd = e => {
    e.stopPropagation()
    addPaneAfter(id, [])
  }
  const handlePaneClose = (e) => {
    e.stopPropagation()
    removePane(id)
  }

  const handleTabButtonDrag = (e, tabId) => {
    e.dataTransfer.setData("tab", JSON.stringify({tabId, paneId: id}))
  }

  const handleEndDrop = e => {
    //TODO: Make this check for a link or component drop :)
    const { tabId, paneId } = JSON.parse(e.dataTransfer.getData("tab")) 

    //Reorder tab
    if(paneId === id) {
      moveTab(id, tabId, tabs.length)
      return
    }

    //Move between panes
    moveTabBetweenPanes(paneId, tabId, id)
  }

  const handleTabDrop = (e, i) => {
    e.stopPropagation()

    //TODO: Make this check for a link or component drop :)
    const { tabId, paneId } = JSON.parse(e.dataTransfer.getData("tab"))

    //Reorder tab
    if(paneId === id) {
      moveTab(id, tabId, i)
      return
    }

    //Move between panes
    moveTabBetweenPanes(paneId, tabId, id, i)
  }

  const handleTabDrag = e => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handlePaneDrag = e => {
    e.preventDefault()
  }

  return (<div key={id} className={`pane ${focusedPane === id && 'focused'}`} onClick={() => focusPane(id)} style={{width: `${width}%`}} >
    <div className="topBar" onDrop={handleEndDrop} onDragOver={handlePaneDrag}>
      <div className="tabButtons">
        {tabs?.map((tab, i) => 
          <div key={i} className={`tabButton ${i === activeTab && 'active'}`} onClick={e => handleClick(e, i)} draggable onDragStart={e => handleTabButtonDrag(e, i)} onDragOver={handleTabDrag} onDrop={e => handleTabDrop(e, i)}>
            <span className="title">{tab.title}</span>
            <div className="closeButton" onClick={e => handleClose(e, i)}><Close /></div>
          </div>
        )}
      </div>

      <div className="paneControls">
        <div className="paneAddButton" onClick={handlePaneAdd}>     <Add /> </div>
        <div className="paneCloseButton" onClick={handlePaneClose}> <Close /> </div>
      </div>
    </div>
    {tabs?.length > 0 ?
      tabs.map((tab, i) => <Tab key={tab.key} content={tab.content} visible={i === activeTab} />)
    : <></>}
  </div>)

}

export default Pane