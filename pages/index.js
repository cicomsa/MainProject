import React from 'react'
import styled from 'styled-components'
import Main from '../src/components/pages/main'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: ${({ theme }) => theme.horizontalAlignment.center};
`

const Body = styled.section`
  margin: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`
const Content = styled.div`
  margin: 30px;
`
const Index = ({ pathname }) => {
  return (
    <Body>
      <Title>Main</Title>
      <Content>
        <Main pathname={pathname} />
      </Content>
    </Body>
  )
}

export default Index