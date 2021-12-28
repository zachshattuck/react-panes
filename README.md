# react-panes
A super easy-to-use tabs-and-panes system for React >= 16.14.0 
### Usage:

`import` `TabSystemProvider`, `TabView` and `useTabFunctions` from `'react-panes'`.

Wrap your `TabView` and any usages of `useTabFunctions` in the `TabSystemProvider` and you are good to go.

Use `useTabFunctions` from anywhere within the `TabSystemProvider` to get access to control functions.

You can pass any component into any of the tab-adding functions and it will display them without CSS tampering.
