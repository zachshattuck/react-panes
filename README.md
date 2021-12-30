# react-tabs-system
A super easy-to-use tabs-and-panes system for React >= 16.14.0 
### Usage:

`import` `TabSystemProvider`, `TabView` and `useTabFunctions` from `'react-panes'`.

Wrap your `<TabView />` and any usages of `useTabFunctions()` in the `TabSystemProvider`. Provide `TabSystemProvider` with `initialTabs`, formatted as following:

`initialTabs={ [ { title: "Tab Title", content: <AnyComponent /> }, ... ] }`
(Currently you can only supply initial tabs for one pane. This will change in the future.)

Use `const {...} = useTabFunctions()` from anywhere within the `TabSystemProvider` to get access to control functions. The available controls are `addTab(component, title)`, `addTabAndFocus(component, title)`, and `addTabToNewPane(component, title)`. There will be more coming.

You can drag and drop tabs to reorder them. A tab will keep its state if it stays at the same index throughout changes. Any tab movements that reorder that tab or move it a cross a pane will destroy state. I am hoping to solve this soon!

### Styling:
The TabView and all of the panes/tabs come pre-styled, but if you'd like to change the styling, the CSS class layout looks like this:

`div.tabView`  
`- >div.pane`  
`- - >div.topBar`  
`- - - >div.tabButtons`  
`- - - - >div.tabButton`  
`- - - - - >span.title`  
`- - - - - >div.closeButton`  
`- - - - >div.paneControls`  
`- - - - - >div`  
`- - >div.tabContent (has the class 'visible' if it is active)`  
