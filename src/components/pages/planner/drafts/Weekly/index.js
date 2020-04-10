import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
  border-bottom: 1px solid orange;
  border-left: 1px solid orange;
  display: flex;
  justify-content: space-around;
`

const Form = styled.div`
  border-right: 1px solid orange;
  text-align: center;
`

const Textarea = styled.textarea`
  display: block;
  height: 100px;
  margin: auto;
  width: 95%;
`
const Index = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return (
    <Container>
      {days.map(day => {
        return (
          <Form key={day}>
            <p>{day}</p>
            <Textarea type="text" />
          </Form>
        )
      })}
    </Container>
  )
}

export default Index
