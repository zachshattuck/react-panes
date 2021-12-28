# react-panes
## A super easy-to-use tabs-and-panes system for React >= 16.14.0 
### Usage:

`
import { TabSystemProvider, TabView, useTabFunctions } from 'react-panes'

<TabSystemProvider>
 ...
 <TabView />
 ...
</TabSystemProvider>
`

Use `useTabFunctions` from anywhere within the `TabSystemProvider` to get access to control functions.