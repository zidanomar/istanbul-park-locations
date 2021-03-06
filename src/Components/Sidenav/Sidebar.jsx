import React, { useState } from 'react'

import './Sidebar.css'

function Sidebar({ parkData, onClick, filter, setInputFilter }) {
  const [active, setActive] = useState(false)

  const handleChange = (e) => {
    setInputFilter(e.target.value)
  }

  const closeHandler = () => {
    setActive(false)
  }
  
  const openHandler = () => {
    setActive(true)
  }
  

  return (
    <div>
      <nav id="sideNav" style={ { left: active ? '0' : '-320px' } }  >
        <div className="park-filter">
          <input type="text" onChange={handleChange} placeholder="Search Park or Neighborhood"></input>
        </div>
        <div id='listings' className='listings'>
          {parkData.map((park, index) => {
            return(
              <div
                key={park._id}
                id={`listing-${index}`}
                onClick={() => {
                  onClick(park);
                  closeHandler();
                }}
                className="item">
                <h2 className="title" id={`link-${index}`}>{park.NAME}</h2>              
                <h3 className="list-adress">{park.NEIGHBORHOOD_NAME} - {park.COUNTY_NAME}</h3>
              </div>
            )
          })}
        </div>
      </nav>
      <div className={ active ? 'menu-btn open' : 'menu-btn'} onClick={active ? closeHandler : openHandler}>
        <div className="menu-btn__burger"></div>
      </div>
    </div>
  )
}

export default Sidebar
