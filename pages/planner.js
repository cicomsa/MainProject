import React from 'react'
import styled from 'styled-components'
import Planner from '../src/components/pages/planner'
import planners from '../src/components/pages/consts/planners.json'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: ${({ theme }) => theme.horizontalAlignment.center};
`

const Body = styled.div`
  margin: 1rem;
  // border: 1px solid ${({ theme }) => theme.colors.secondary};
`
const Content = styled.div`
  // margin: 30px;
`
const Index = ({ planner }) => {
  return (
    <Body>
      <Title>Planner</Title>
      <Content>
        <Planner />
      </Content>
    </Body>
  )
}

export default Index

Index.getInitialProps = async ({ query }) => {
  return {
    planner: planners[query.handle]
  }
}