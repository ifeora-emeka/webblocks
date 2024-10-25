import React, { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import EachPropertyLayout from '../EachPropertyLayout'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { SUPPORTED_TEXT_ELEMENTS } from '../../builder.constants'
import { useBuilderUtils } from '../../hooks/builder-utils.hooks'
import { useRenderer } from '@/components/builder/context/renderer.context'

type Props = {}

export default function TextElementAttribute({}: Props) {
  const { state: {active_element}} = useRenderer();
  const text_content = active_element[0]?.text_content
  const [textContent, setTextContent] = useState(text_content)
  const {} = useBuilderUtils()

  useEffect(() => {
    setTextContent(text_content)
  }, [text_content])

  if (
    !SUPPORTED_TEXT_ELEMENTS.includes(
      String(active_element[0]?.html_tag) || 'null',
    )
  ) {
    return null
  }

  const handleSave = () => {
    if (textContent && active_element[0] && active_element.length === 1) {
    }
  }

  return (
    <>
      <EachPropertyLayout
        label={'Text content'}
        layout="column"
        onAddValue={() => {}}
        // onRemoveValue={removePropertyValue}
      >
        <Textarea
          value={textContent}
          onBlur={handleSave}
          onChange={(e) => setTextContent(e.target.value)}
          className="border border-border text-sm focus:bg-background"
          placeholder="Enter text content"
        />
      </EachPropertyLayout>
    </>
  )
}
