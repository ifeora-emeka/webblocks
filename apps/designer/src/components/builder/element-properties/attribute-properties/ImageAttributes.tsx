import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import useElementAttribute from '../../hooks/element-attribute.hooks'
import { Input } from '@/components/ui/input'
import { debounce } from '../../builder.utils'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'

export default function ImageAttributes() {
  const { active_element } = useSelector((state: AppStore) => state.renderer)
  const tagType = active_element[0]?.element_data?.html_tag
  const {
    propertyValue: srcValue,
    updatePropertyValue: updateSrcValue,
    removePropertyValue: removeSrcValue,
  } = useElementAttribute('src')
  const {
    propertyValue: widthValue,
    updatePropertyValue: updateWidthValue,
    removePropertyValue: removeWidthValue,
  } = useElementAttribute('width')
  const {
    propertyValue: heightValue,
    updatePropertyValue: updateHeightValue,
    removePropertyValue: removeHeightValue,
  } = useElementAttribute('height')

  if (tagType !== 'img') return null

  const debouncedUpdateMarginValue = debounce((value: string) => {
    updateSrcValue(value)
  }, 30)

  const debouncedUpdateWidthValue = debounce((value: string) => {
    updateWidthValue(value)
  }, 40)

  const debouncedUpdateHeightValue = debounce((value: string) => {
    updateHeightValue(value)
  }, 40)

  return (
    <>
      <EachPropertyLayout
        label={'Source'}
        isEmpty={!srcValue}
        onAddValue={() => updateSrcValue('http://')}
        onRemoveValue={removeSrcValue}
      >
        <Input
          className=" focus:bg-background active:bg-background hover:bg-background border-0 text-center"
          value={srcValue}
          onChange={(e) => debouncedUpdateMarginValue(e.target.value)}
        />
      </EachPropertyLayout>
      <EachPropertyLayout
        label={'Width'}
        isEmpty={!widthValue}
        onAddValue={() => updateWidthValue('20px')}
        onRemoveValue={removeWidthValue}
      >
        <Input
          className=" focus:bg-background active:bg-background hover:bg-background border-0 text-center"
          value={widthValue}
          onChange={(e) => debouncedUpdateWidthValue(e.target.value)}
        />
      </EachPropertyLayout>
      <EachPropertyLayout
        label={'Height'}
        isEmpty={!heightValue}
        onAddValue={() => updateHeightValue('20px')}
        onRemoveValue={removeHeightValue}
      >
        <Input
          className=" focus:bg-background active:bg-background hover:bg-background border-0 text-center"
          value={heightValue}
          onChange={(e) => debouncedUpdateHeightValue(parseInt(e.target.value))}
        />
      </EachPropertyLayout>
    </>
  )
}
