import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { useBuilderUtils } from './builder-utils.hooks'

type HTMLAttributeProps =
  | keyof React.HTMLAttributes<HTMLElement>
  | keyof React.ImgHTMLAttributes<HTMLImageElement>

const useElementAttribute = (property: HTMLAttributeProps) => {
  const { updateAttributes, removeAttribute } = useBuilderUtils()
  const { active_element, allElements } = useSelector(
    (state: AppStore) => state.renderer,
  )

  const activeElement = allElements.find(
    (el) => el.dnd_id === active_element[0].dnd_id,
  )
  const elementAttributes =
    activeElement && activeElement.element_data.attributes

  const [propertyValue, setPropertyValue] = useState<string>(
    //@ts-ignore
    elementAttributes?.[property] || '',
  )

  useEffect(() => {
    //@ts-ignore
    setPropertyValue(elementAttributes?.[property] || '')
  }, [active_element, elementAttributes, property])

  const updatePropertyValue = (value: string) => {
    const newAttributes = {
      ...elementAttributes,
      [property]: value,
    }

    updateAttributes({
      element_id: active_element[0].element_data.element_id,
      //@ts-ignore
      newAttributes,
    })

    setPropertyValue(value)
  }

  const removePropertyValue = () => {
    if (activeElement) {
      removeAttribute({
        property,
        element_id: activeElement?.element_data.element_id,
      })
    }
  }

  return {
    propertyValue,
    updatePropertyValue,
    removePropertyValue,
  }
}

export default useElementAttribute
