import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Index = ({ pathname }) => {
  return (
    <div>Main Planner Content</div>
  )
}

export default Index

Index.propTypes = {
  pathname: PropTypes.string.isRequired
}