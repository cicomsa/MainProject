import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Transforms, Text, Editor } from 'slate'
import { Slate, Editable } from 'slate-react'
import isHotkey from 'is-hotkey'

const TextEditor = styled.div`
  border: 1px solid orange;
  display: block;
  height: 150px;
  margin: auto;
  width: 95%;
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
  return returnElement(leaf, attributes, children)
}

const Index = ({ editor, value, handleChange }) => {
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

  const changeValue = value => handleChange(value)

  return (
    <TextEditor>
      {editor && (
        <Slate editor={editor} value={value} onChange={changeValue}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={event => onKeyDown(event, editor)}
          />
        </Slate>
      )}
    </TextEditor>
  )
}

export default Index
