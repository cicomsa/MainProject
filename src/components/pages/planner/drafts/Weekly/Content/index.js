import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Editor from '../../../../../Editor'

const Container = styled.div`
  border-bottom: 1px solid orange;
  border-left: 1px solid orange;
  display: flex;
  justify-content: space-around;
`
const Form = styled.div`
  border-right: 1px solid orange;
  text-align: center;
  width: 95%;
`

const Index = ({ editors, days, values, handleChange }) => {
  return (
    <Container>
      {days.map((day, i) => {
        return (
          <Form key={`day${i}`}>
            <p>{day}</p>
            <Editor editor={editors[i]} value={values[i]} handleChange={handleChange} />
          </Form>
        )
      })}
    </Container>
  )
}

export default Index
