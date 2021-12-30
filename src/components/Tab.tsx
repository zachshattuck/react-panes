import React from "react" 

export type TabProps = {
  content: JSX.Element,
  visible?: boolean
}

const Tab = ({content, visible = false}: TabProps) => {
  return (
    <div className={`tabContent ${visible ? 'visible' : ''}`}>
      {content}
    </div>
  )
}

export default Tab