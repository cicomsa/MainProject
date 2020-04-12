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
  width: 100%;
`
const TextEditor = styled.div`
  border: 1px solid red;
  display: block;
  height: 50px;
  margin: auto;
  width: 95%;
`
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: false,
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
      universal: true,
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },
}

const Leaf = props => {
  return (
    <>
      {props.leaf.bold && !props.leaf.italic && <strong {...props.attributes}>{props.children}</strong>}
      {!props.leaf.bold && props.leaf.italic && <em {...props.attributes}>{props.children}</em>}
      {props.leaf.bold && props.leaf.italic && <strong><em {...props.attributes}>{props.children}</em></strong>}
      {!props.leaf.bold && !props.leaf.italic && <span {...props.attributes}>{props.children}</span>}
    </>
  )
}

const App = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])
  const isBoldHotkey = isHotkey('mod+b')
  const isItalicHotkey = isHotkey('mod+i')
  const isCodeBlockHotkey = isHotkey('`')

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <pre {...props.attributes}>{props.children}</pre>
      case 'underline':
        return <u {...props.attributes}>{props.children}</u>
      case 'list':
        return <li {...props.attributes}>{props.children}</li>
      default:
        return <span {...props.attributes}>{props.children}</span>
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <Container>
      {days.map(day => {
        return (
          <Form key={day}>
            <p>{day}</p>
            <TextEditor>
              <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  onKeyDown={event => {
                    switch (true) {
                      case isCodeBlockHotkey(event): {
                        event.preventDefault()
                        CustomEditor.toggleCodeBlock(editor)
                        break
                      }

                      case isBoldHotkey(event): {
                        event.preventDefault()
                        CustomEditor.toggleBoldMark(editor)
                        break
                      }

                      case isItalicHotkey(event): {
                        event.preventDefault()
                        CustomEditor.toggleItalicMark(editor)
                        break
                      }
                    }
                  }}
                />
              </Slate>
            </TextEditor>
          </Form>
        )
      })}
    </Container>
  )
}

export default App
