import {
  VariableData,
  VariableSetData,
  VariableValueType,
} from '@repo/designer/types/variables.types'
import { generateRandomId } from '@/lib/utils'
import slugify from 'slugify'

interface VariableSetInfo {
  slug: string
  type: VariableValueType
}

let variableSetInfo: VariableSetInfo[] = [
  { slug: 'spacing', type: VariableValueType.UOM },
  { slug: 'font_size', type: VariableValueType.UOM },
  { slug: 'brand', type: VariableValueType.COLOR },
  { slug: 'color', type: VariableValueType.COLOR },
  { slug: 'line_height', type: VariableValueType.UOM },
  { slug: 'font_weight', type: VariableValueType.NUMBER },
  { slug: 'border_radius', type: VariableValueType.UOM },
  { slug: 'shadow', type: VariableValueType.SHADOW },
]

let slugVariables: Record<string, Partial<VariableData>[]> = {
  spacing: [
    { name: 'small', value: '4px' },
    { name: 'medium', value: '8px' },
    { name: 'large', value: '16px' },
  ],
  font_size: [
    { name: 'small', value: '12px' },
    { name: 'medium', value: '16px' },
    { name: 'large', value: '24px' },
  ],
  brand: [
    { name: 'primary', value: '#1E90FF' },
    { name: 'secondary', value: '#FFD700' },
  ],
  color: [
    { name: 'black', value: '#000000' },
    { name: 'white', value: '#FFFFFF' },
    { name: 'gray', value: '#808080' },
    { name: 'red', value: '#D96243' },
    { name: 'green', value: '#4E8054' },
    { name: 'blue', value: '#3535d9' },
  ],
  line_height: [
    { name: 'tight', value: 1.2 },
    { name: 'normal', value: 1.5 },
    { name: 'loose', value: 1.8 },
  ],
  font_weight: [
    { name: 'light', value: 300 },
    { name: 'regular', value: 400 },
    { name: 'bold', value: 700 },
  ],
  border_radius: [
    { name: 'small', value: 4 },
    { name: 'medium', value: 8 },
    { name: 'large', value: 16 },
  ],
  shadow: [
    { name: 'small', value: '0 1px 2px rgba(0, 0, 0, 0.1)' },
    { name: 'medium', value: '0 3px 6px rgba(0, 0, 0, 0.1)' },
    { name: 'large', value: '0 10px 20px rgba(0, 0, 0, 0.1)' },
  ],
}

export function generateDefaultCollectionAndVariables(): {
  variables: VariableData[]
  variableSets: VariableSetData[]
} {
  let variableSets: VariableSetData[] = []
  let variables: VariableData[] = []

  variableSetInfo.forEach((setInfo, index) => {
    let setId = generateRandomId(12)
    variableSets.push({
      _id: setId,
      name: setInfo.slug.replaceAll('_', ' '),
      slug: slugify(setInfo.slug),
      index: index + 1,
      isStatic: true,
    })

    slugVariables[setInfo.slug].forEach((variable, varIndex) => {
      variables.push({
        _id: generateRandomId(12),
        name: variable.name ?? '',
        slug: slugify(variable.name ?? ''),
        index: varIndex + 1,
        isStatic: true,
        value_type: setInfo.type,
        set: setId,
        value: variable.value ?? '',
      })
    })
  })

  return {
    variables,
    variableSets,
  }
}
