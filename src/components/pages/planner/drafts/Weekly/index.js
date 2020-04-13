import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Editor from './Editor'

const Container = styled.div`
  border-bottom: 1px solid orange;
  border-left: 1px solid orange;
  display: flex;
  justify-content: space-around;
`
const Form = styled.div`
  border-right: 1px solid orange;
  text-align: center;
  width: 150px;
`

const Index = ({ content, weeklies }) => {
  const { editors, days } = content

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    }
  ])

  return (
    <Container>
      {days && days.map((day, i) => {
        return (
          <Form key={`day${i}`}>
            <p>{day}</p>
            <Editor editor={editors[`editor${i + 1}`]} value={value} setValue={setValue} />
          </Form>
        )
      })}
    </Container>
  )
}

export default Index
