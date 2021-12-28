import { Close } from "@material-ui/icons"
import { useContext } from "react"
import { paneState, topState, Tab } from "../hooks/useTabs"

/**
 * Only used by useTabs.
 * @returns 
 */
export const Pane = () => {

  const {id, tabs, addTab, removeTab, activeTab, setActiveTab} = useContext(paneState)
  const {removePane, focusedPane, focusPane} = useContext(topState)
  
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

  return (<div key={id} className={`pane ${focusedPane === id && 'focused'}`} onClick={() => focusPane(id)}>
    <div className="topBar">
      {tabs?.map((tab, i) => 
        <div className={`tabButton ${i === activeTab && 'active'}`} onClick={e => handleClick(e, i)} key={i}>
          <span className="title">{tab.title}</span>
          <div className="closeButton" onClick={e => handleClose(e, i)}><Close /></div>
        </div>
      )}

      <div className="paneCloseButton" onClick={handlePaneClose}>
        <Close />
      </div>
    </div>
    {tabs?.length > 0 ?
      <Tab content={tabs[activeTab].content} />
    : <></>}
  </div>)

}

export default Pane