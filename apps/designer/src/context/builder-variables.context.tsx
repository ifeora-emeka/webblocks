import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  VariableData,
  VariableSetData,
  VariableValueType,
} from '@repo/designer/types/variables.types'
import { generateRandomId } from '@/lib/utils'
import slugify from 'slugify'
import { generateDefaultCollectionAndVariables } from '@/__mock__/variables.mock'
import {
  BuilderReferenceType,
  BuilderReferenceValue,
} from '@repo/designer/types/designer.types'

interface BuilderVariablesContextType {
  state: {
    variables: VariableData[]
    variableSets: VariableSetData[]
    activeSet: string | null
  }
  setState: React.Dispatch<
    React.SetStateAction<{
      variables: VariableData[]
      variableSets: VariableSetData[]
      activeSet: string | null
    }>
  >
  createVariableSet: (name: string) => void
  deleteSetByID: (_id: string) => Promise<void>
  addAVariableToSet: (params: {
    value_type: VariableValueType
    setId: string
    name: string
    isGlobal?: boolean
  }) => void
  setActiveSet: (val: string) => void
  updateVariableSet: (params: { name: string; _id: string }) => void
  updateVariable: (params: {
    _id: string
    name: string
    value: number | string
  }) => void
  deleteVariable: (_id: string) => Promise<void>
  getVariableByID: (ID: string) => VariableData | undefined
  parseVariableRef: (ref: string) => BuilderReferenceValue
}

const BuilderVariablesContext = createContext<
  BuilderVariablesContextType | undefined
>(undefined)

export const BuilderVariablesProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [state, setState] = useState<{
    variables: VariableData[]
    variableSets: VariableSetData[]
    activeSet: string | null
  }>({
    variables: [],
    variableSets: [],
    activeSet: null,
  })

  useEffect(() => {
    let { variableSets: sets, variables: vars } =
      generateDefaultCollectionAndVariables()
    let exists = localStorage.getItem('vars')

    if (exists) {
      setState(JSON.parse(exists))
    } else {
      let data = {
        activeSet: null,
        variableSets: sets,
        variables: vars,
      }

      localStorage.setItem('vars', JSON.stringify(data))
      setState(data)
    }
  }, [])

  const createVariableSet = (name: string) => {
    if (name) {
      let newSetID = generateRandomId(9)
      setState((prev) => ({
        ...prev,
        variableSets: [
          ...prev.variableSets,
          {
            _id: newSetID,
            name,
            slug: slugify(name),
            index: prev.variableSets.length + 1,
            editEnabled: true,
          },
        ],
        activeSet: newSetID,
      }))
    }
  }

  const updateVariableSet = ({ name, _id }: { name: string; _id: string }) => {
    setState((prev) => ({
      ...prev,
      variableSets: prev.variableSets.map((set) =>
        set._id === _id
          ? { ...set, name, slug: slugify(name), editEnabled: false }
          : set,
      ),
    }))
  }

  const deleteSetByID = async (_id: string) => {
    setState((prev) => {
      return {
        ...prev,
        variableSets: prev.variableSets.filter((set) => set._id !== _id),
        variables: prev.variables.filter((variable) => variable.set !== _id),
        activeSet: null,
      }
    })
  }

  const addAVariableToSet = ({
    value_type,
    setId,
    name,
    isStatic = false,
  }: {
    value_type: VariableValueType
    setId: string
    name: string
    isStatic?: boolean
  }) => {
    const set = state.variableSets.find((s) => s._id === setId)
    if (!set) return

    const newVariable: VariableData = {
      _id: generateRandomId(9),
      name,
      slug: slugify(name),
      index: state.variables.filter((v) => v.set === setId).length + 1,
      value_type,
      set: setId,
      isStatic,
      value: value_type === 'number' ? 16 : '',
    }

    setState((prev) => ({
      ...prev,
      variables: [...prev.variables, newVariable],
    }))
  }

  const updateVariable = ({
    _id,
    name,
    value,
  }: {
    _id: string
    name: string
    value: number | string
  }) => {
    setState((prev) => ({
      ...prev,
      variables: prev.variables.map((variable) =>
        variable._id === _id
          ? { ...variable, name, slug: slugify(name), value }
          : variable,
      ),
    }))
  }

  const deleteVariable = async (_id: string) => {
    setState((prev) => ({
      ...prev,
      variables: prev.variables.filter((variable) => variable._id !== _id),
    }))
  }

  const setActiveSet = (val: string) => {
    if (val !== state.activeSet) {
      setState((prev) => ({
        ...prev,
        activeSet: val,
      }))
    }
  }

  const getVariableByID = (ID: string): VariableData | undefined => {
    return state.variables.find((vars) => vars._id === ID)
  }

  const parseVariableRef = (ref: string): BuilderReferenceValue => {
    let val = ref.split('::')
    let type = val[1] as BuilderReferenceType
    let ref_id = val[2] as string

    return {
      ref_id,
      type,
    }
  }

  const value: BuilderVariablesContextType = {
    state,
    setState,
    createVariableSet,
    deleteSetByID,
    addAVariableToSet,
    updateVariableSet,
    updateVariable,
    deleteVariable,
    setActiveSet,
    getVariableByID,
    parseVariableRef,
  }

  return (
    <BuilderVariablesContext.Provider value={value}>
      {children}
    </BuilderVariablesContext.Provider>
  )
}

export const useBuilderVariables = (): BuilderVariablesContextType => {
  const context = useContext(BuilderVariablesContext)
  if (context === undefined) {
    throw new Error(
      'useBuilderVariables must be used within a BuilderVariablesProvider',
    )
  }
  return context
}
