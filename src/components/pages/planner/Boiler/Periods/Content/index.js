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

  .title {
    border-bottom: 1px solid orange;
    margin: 0;
    padding: 16px 0;
  }
`

const Index = ({ editors, periods, values }) => {
  return (
    <Container>
      {periods.map((period, i) => {
        return (
          <Form key={`period${i}`}>
            <p className="title">{period}</p>
            <Editor editor={editors[i]} value={values[i]} />
          </Form>
        )
      })}
    </Container>
  )
}

export default Index
