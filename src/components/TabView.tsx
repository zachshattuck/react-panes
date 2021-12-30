import { useContext } from "react"
import { topState, Pane, PaneStateProvider } from "../hooks/useTabs"

/**
 * Top-level renderer for useTabs. Generates pane contexts and styles everything.
 * @returns 
 */
 export const TabView = () => {
  const { panes } = useContext(topState)
  return(<div className="tabView">

    {panes.map((_pane, i) => 
      <PaneStateProvider key={i} id={i}>
        <Pane width={100/panes.length} />
      </PaneStateProvider>
    )}

  </div>)
}

export default TabView