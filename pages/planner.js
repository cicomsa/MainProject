import React from 'react'
import styled from 'styled-components'
import Planner from '../src/components/pages/planner'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: ${({ theme }) => theme.horizontalAlignment.center};
`

const Body = styled.section`
  margin: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`
const Content = styled.div`
  margin: 30px;
`
const Index = ({ pathname }) => {
  return (
    <Body>
      <Title>Planner</Title>
      <Content>
        <Planner pathname={pathname} />
      </Content>
    </Body>
  )
}

export default Index