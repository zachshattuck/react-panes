/**
 * Tab component utilized by useTabs.js
 * @param {Object} props
 * @param {number} props.id The ID of the tab.
 * @param {*} props.content The component to display within the tab. 
 * @returns 
 */
 export const Tab = ({content}) => {
  return <div className="tab">
    <div className="content">
      {content}
    </div>
  </div>
}

export default Tab