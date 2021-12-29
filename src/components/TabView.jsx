import { useContext } from "react"
import { topState, Pane, PaneStateProvider } from "../hooks/useTabs"

/**
 * Top-level renderer for useTabs. Generates pane contexts and styles everything.
 * @returns 
 */
 export const TabView = () => {
  const { panes } = useContext(topState)
  return(<div className="tabView">

    {panes.map((pane, i) => 
      <PaneStateProvider key={i} id={i}>
        <Pane />
      </PaneStateProvider>
    )}

  </div>)
}

export default TabView