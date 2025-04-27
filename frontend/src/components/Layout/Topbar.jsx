import React from 'react'
import trackoder from '../../assets/track_order.png'
import { Mails } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';

function Topbar() {
  return (
    <div className="flex justify-between items-center p-4 shadow-md" style={{ height: '0.5rem',fontSize: '10px', backgroundColor:'rgb(238, 238, 238)',boxShadow:'none'}}>
      <div className="float-left flex items-center gap-4">
        <div className="flex  items-baseline gap-1  cursor-pointer">
          <span variant="medium" type="3xs" color="#000000cc" className="sc-f48c17b3-0 dLoZQA">Offers</span>
        </div>
        <div className="flex  items-baseline gap-1  cursor-pointer">
          <span variant="medium" type="3xs" color="#000000cc" className="sc-f48c17b3-0 dLoZQA">Fanbook</span>
        </div>
      </div>
      <div className="float-right flex items-center gap-4">
          <a href='#'><MessageCircleMore width="30"/></a>
          <a href='#'><img src={trackoder} alt="track order button" width="30" height="10"/></a>
      </div>
    </div>
  )
}

export default Topbar