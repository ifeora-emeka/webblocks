import { useEffect, useState } from 'react'
import { ChakraProps } from '@chakra-ui/react'
import { useBuilderVariables } from '@/components/builder/context/builder-variables.context'
import { useRenderer } from '@/components/builder/context/renderer.context'

const areAllValuesSame = (obj: Record<string, string>) => {
  const values = Object.values(obj)
  return values.every((val) => val === values[0])
}

const useElementProperty = (property: keyof ChakraProps) => {
  const { getVariableByID, parseVariableRef } = useBuilderVariables()
  const {
    state: { active_element, activeBreakpoint, allElements },
    updateElementChakraProps, removeChakraProp
  } = useRenderer()
  const activeElement = allElements.find((el) => el.id === active_element[0].id)
  const chakraProps = activeElement && activeElement.chakraProps

  const [propertyValue, setPropertyValue] = useState<string>(
    //@ts-ignore
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
        [activeBreakpoint]: value.trim(),
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

    updateElementChakraProps({
      ...newChakraStyle,
    })

    // updateElementChakraStyleData({
    //   element_id: active_element[0]?.element_id,
    //   //@ts-ignore
    //   newChakraStyle,
    // })

    setPropertyValue(value)
  }

  const removePropertyValue = () => {
    if (activeElement) {
      // removeElementChakraProperty({
      //   property,
      //   element_id: activeElement?.element_data.element_id,
      // })
      removeChakraProp(property)
    }
  }

  let varReferenceValue = ''
  let isCorners = false

  if (propertyValue.includes('ref')) {
    let val = parseVariableRef(propertyValue)
    varReferenceValue = String(getVariableByID(val.ref_id)?.value || '')
  }

  if (propertyValue.split(' ').length === 4) {
    isCorners = true
  }

  return {
    propertyValue,
    updatePropertyValue,
    removePropertyValue,
    varReferenceValue,
    isCorners,
  }
}

export default useElementProperty
