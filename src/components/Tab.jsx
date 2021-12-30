import React from 'react'

const Tab = ({content, visible = false}) => {
  return (
    <div className={`tabContent ${visible && 'visible'}`}>
      {content}
    </div>
  )
}

export default Tab