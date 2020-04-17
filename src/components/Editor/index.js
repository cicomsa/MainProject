import React, { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Slate, Editable } from 'slate-react'
import { HandleChangeContext } from '../pages/planner/drafts/Periods'
import {
  returnElement,
  renderElement,
  CustomEditor,
  onKeyDown
} from '../../helpers/editor'

const Index = ({ editor, value }) => {
  const handleChange = useContext(HandleChangeContext)
  const changeValue = value => handleChange(value)

  return (
    <>
      {editor && (
        <Slate editor={editor} value={value} onChange={changeValue}>
          <Editable
            renderElement={renderElement()}
            renderLeaf={renderElement('leaf')}
            onKeyDown={event => onKeyDown(event, editor)}
          />
        </Slate>
      )}
    </>
  )
}

export default Index
