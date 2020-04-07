import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Index = ({ pathname }) => {
  return (
    <div>Main Page Content</div>
  )
}

export default Index

Index.propTypes = {
  pathname: PropTypes.string.isRequired
}