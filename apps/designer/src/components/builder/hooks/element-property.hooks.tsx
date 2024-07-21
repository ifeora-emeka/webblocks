import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { useBuilder } from '@/components/builder/hooks/builder.hooks'
import { ChakraProps } from '@chakra-ui/react'

const areAllValuesSame = (obj: Record<string, string>) => {
  const values = Object.values(obj)
  return values.every((val) => val === values[0])
}

const useElementProperty = (property: keyof ChakraProps) => {
  const { updateElementChakraStyleData, removeElementChakraProperty } =
    useBuilder()
  const { active_element, activeBreakpoint, allElements } = useSelector(
    (state: AppStore) => state.renderer,
  )

  const activeElement = allElements.find(
    (el) => el.dnd_id === active_element[0].dnd_id,
  )
  const chakraProps = activeElement && activeElement.element_data.chakraProps

  //@ts-ignore
  const [propertyValue, setPropertyValue] = useState<string>(
    chakraProps?.[property]?.[activeBreakpoint] || '',
  )

  useEffect(() => {
    //@ts-ignore
    setPropertyValue(chakraProps?.[property]?.[activeBreakpoint] || '')
  }, [active_element, activeBreakpoint, chakraProps, property])

  const updatePropertyValue = (value: string) => {
    const currentProperty = chakraProps?.[property] || {}
    const newChakraStyle: Partial<ChakraProps> = {
      [property]: {
        ...currentProperty,
        [activeBreakpoint]: value,
      },
    }

    if (activeBreakpoint === 'lg' && areAllValuesSame(currentProperty as any)) {
      //@ts-ignore
      newChakraStyle[property] = {
        base: value,
        md: value,
        lg: value,
      }
    }

    updateElementChakraStyleData({
      element_id: active_element[0].element_data.element_id,
      //@ts-ignore
      newChakraStyle,
    })

    setPropertyValue(value)
  }

  const removePropertyValue = () => {
    if (activeElement) {
      removeElementChakraProperty({
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

export default useElementProperty
