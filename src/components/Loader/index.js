import React from 'react'
import { Spinner } from 'reactstrap'

const Loader = ({ withOverlay, ...props }) => (
  <div className="full-back spin-overlay z-index-1000">
    <div className="pos-center">
      <Spinner {...props} />
    </div>
  </div>
)

export default Loader
