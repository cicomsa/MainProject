import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { createEditor, Transforms, Text, Editor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import isHotkey from 'is-hotkey'

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
const TextEditor = styled.div`
  div[role="textbox"] {
    border: 1px solid orange;
    display: block;
    height: 150px;
    margin: auto;
    width: 95%;
  }
`
const CustomEditor = {
  isMarkActive(editor, mark) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === mark,
    })

    return !!match
  },

  toggleMark(editor, mark) {
    const isActive = CustomEditor.isMarkActive(editor, mark)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : mark },
      { match: n => Text.isText(n), split: true }
    )
  },
}

const returnElement = (element, attributes, children) => {
  switch (element.type) {
    case 'code':
      return <pre {...attributes}>{children}</pre>
    case 'underline':
      return <u {...attributes}>{children}</u>
    case 'list':
      return <li {...attributes}>{children}</li>
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'italic':
      return <em {...attributes}>{children}</em>
    default:
      return <span {...attributes}>{children}</span>
  }
}

const Leaf = props => {
  const { leaf, attributes, children } = props
  console.log(leaf)
  return returnElement(leaf, attributes, children)
}

const App = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const editor = useMemo(() => withReact(createEditor()), [])
  const editor1 = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])
  const [value1, setValue1] = useState([
    {
      type: 'italic',
      children: [{ text: '' }],
    },
  ])
  const isBoldHotkey = isHotkey('mod+b')
  const isItalicHotkey = isHotkey('mod+i')
  const isCodeBlockHotkey = isHotkey('`')

  const renderElement = useCallback(props => {
    const { attributes, children, element } = props
    return returnElement(element, attributes, children)
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const onKeyDown = (event, editor) => {
    switch (true) {
      case isCodeBlockHotkey(event): {
        event.preventDefault()
        CustomEditor.toggleMark(editor, 'code')
        break
      }

      case isBoldHotkey(event): {
        event.preventDefault()
        CustomEditor.toggleMark(editor, 'bold')
        break
      }

      case isItalicHotkey(event): {
        event.preventDefault()
        CustomEditor.toggleMark(editor, 'italic')
        break
      }
    }
  }

  return (
    <Container>
      {/* {days.map(day => {
        return (
          <Form key={day}>
            <p>{day}</p>
             */}
      <TextEditor>
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={event => onKeyDown(event, editor)}
          />
        </Slate>
        <Slate editor={editor1} value={value1} onChange={value => setValue1(value)}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={event => onKeyDown(event, editor1)}
          />
        </Slate>
      </TextEditor>
      {/* 
          </Form>
        )
      })} */}
    </Container>
  )
}

export default App
