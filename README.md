# react-tabs-system
A super easy-to-use tabs-and-panes system for React >= 16.14.0 
### Usage:

`import` `TabSystemProvider`, `TabView` and `useTabFunctions` from `'react-panes'`.

Wrap your `<TabView />` and any usages of `useTabFunctions()` in the `TabSystemProvider`. Provide `TabSystemProvider` with `initialTabs`, formatted as following:

`initialTabs={ [ { title: "Tab Title", content: <AnyComponent /> }, ... ] }`
(Currently you can only supply initial tabs for one pane. This will change in the future.)

Use `const {...} = useTabFunctions()` from anywhere within the `TabSystemProvider` to get access to control functions. The available controls are `addTab(component, title)`, `addTabAndFocus(component, title)`, and `addTabToNewPane(component, title)`. There will be more coming.

You can drag and drop tabs to reorder them. It currently destroys the state but I am working to fix that.

### Styling:
If you wanna change the styling, the CSS class layout looks like this:

`div.tabView`
`->div.pane`
`-->div.topBar`
`--->div.tabButtons`
`---->div.tabButton`
`----->span.title`
`----->div.closeButton`
`---->div.paneControls`
`----->div (the buttons themselves)`
`-->div.tabContent (has the class 'visible' if it is active)`
