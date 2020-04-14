import React, { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Transforms, Text, Editor } from 'slate'
import { Slate, Editable } from 'slate-react'
import isHotkey from 'is-hotkey'

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
    case 'paragraph':
      return <p {...attributes}>{children}</p>
    default:
      return <span {...attributes}>{children}</span>
  }
}

const onKeyDown = (event, editor) => {
  const isBoldHotkey = isHotkey('mod+b')
  const isItalicHotkey = isHotkey('mod+i')
  const isCodeBlockHotkey = isHotkey('`')

  switch (true) {
    case isCodeBlockHotkey(event): {
      CustomEditor.toggleMark(editor, 'code')
      break
    }

    case isBoldHotkey(event): {
      CustomEditor.toggleMark(editor, 'bold')
      break
    }

    case isItalicHotkey(event): {
      CustomEditor.toggleMark(editor, 'italic')
      break
    }
  }
}

const Leaf = props => {
  const { leaf, attributes, children } = props
  return returnElement(leaf, attributes, children)
}

const Index = ({ editor, value, handleChange }) => {
  const renderElement = useCallback(props => {
    const { attributes, children, element } = props
    return returnElement(element, attributes, children)
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const changeValue = value => handleChange(value)

  return (
    <>
      {editor && (
        <Slate editor={editor} value={value} onChange={changeValue}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={event => onKeyDown(event, editor)}
          />
        </Slate>
      )}
    </>
  )
}

export default Index
