import React from 'react'

const Container = ({children, type}) => {
  return (
    <div className={type}>{children}</div>
  )
}

export default Container