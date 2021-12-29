# react-panes
A super easy-to-use tabs-and-panes system for React >= 16.14.0 
### Usage:

`import` `TabSystemProvider`, `TabView` and `useTabFunctions` from `'react-panes'`.

Wrap your `<TabView />` and any usages of `useTabFunctions()` in the `TabSystemProvider`. Provide `TabSystemProvider` with `initialState`, formatted as following:

`initialState={ [ { title: "Tab Title", content: <AnyComponent /> }, ... ] }`
(Currently you can only supply initial tabs for one pane. This will change in the future.)

Use `const {...} = useTabFunctions()` from anywhere within the `TabSystemProvider` to get access to control functions. The available controls are `addTab(component, title)`, `addTabAndFocus(component, title)`, and `addTabToNewPane(component, title)`. There will be more coming.

You can drag and drop tabs to reorder them. It currently destroys the state but I am working to fix that.
