import React from 'react'

const Alert = (props) => {
  return (
    <div className='container-fluid z-3 position-absolute start-40' >
      {props.alert && 
      <div className='container-sm px-5 py-2'>
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show text-center`} role="alert">
        {props.alert.msg}
        </div>
      </div>}
    </div>
  )
}

export default Alert