import React, { createContext, useContext, useState } from 'react'
import {
  VariableData,
  VariableSetData,
  VariableValueType,
} from '@repo/designer/types/variables.types'
import { generateRandomId } from '@/lib/utils'
import slugify from 'slugify'

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
    isStatic?: boolean
  }) => void
  setActiveSet: (val: string) => void
  updateVariableSet: (params: { name: string; _id: string }) => void
  updateVariable: (params: {
    _id: string
    name: string
    value: number | string
  }) => void
  deleteVariable: (_id: string) => Promise<void>
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
        variables: prev.variables.filter((variable) =>
          typeof variable.set === 'string'
            ? variable.set !== _id
            : variable.set._id !== _id,
        ),
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
      index:
        state.variables.filter((v) =>
          typeof v.set === 'string' ? v.set === setId : v.set._id === setId,
        ).length + 1,
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
    if(val !== state.activeSet) {
      setState((prev) => ({
        ...prev,
        activeSet: val,
      }))
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
