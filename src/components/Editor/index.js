import React, { useCallback, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Transforms, Text, Editor } from 'slate'
import { Slate, Editable } from 'slate-react'
import isHotkey from 'is-hotkey'
import { HandleChangeContext } from '../pages/planner/drafts/Periods'

// element marks
const returnElement = (element, attributes, children) => {
  switch (element.type) {
    case 'code':
      return <code {...attributes}>{children}</code>
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
      // mandatory fallback for Leaf component
      return <span {...attributes}>{children}</span>
  }
}

// render elements - default/custom(leaf)
const renderElement = (type = 'default') => useCallback(({
  attributes, children, element, leaf // values from props
}) => {
  if (type === 'leaf') {
    return returnElement(leaf, attributes, children)
  }

  return returnElement(element, attributes, children)
}, [])

const CustomEditor = {
  // add new element mark to editor
  isMarkActive(editor, mark) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === mark,
    })

    return !!match
  },

  // create element mark toggle
  toggleMark(editor, mark) {
    const isActive = CustomEditor.isMarkActive(editor, mark)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : mark },
      { match: n => Text.isText(n), split: true }
    )
  }
}

// on key down action - toggle between elements marks
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
