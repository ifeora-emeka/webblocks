import React, { createContext, useContext, useState } from 'react'
import {
  VariableData,
  VariableSetData,
  VariableValueType,
} from '@repo/designer/types/variables.types'
import { generateRandomId } from '@/lib/utils'
import slugify from 'slugify'

interface BuilderVariablesContextType {
  variables: VariableData[]
  setVariables: React.Dispatch<React.SetStateAction<VariableData[]>>
  variableSets: VariableSetData[]
  setVariableSets: React.Dispatch<React.SetStateAction<VariableSetData[]>>
  createVariableSet: (name: string) => void
  deleteSetByID: (_id: string) => Promise<void>
  addAVariableToSet: (params: {
    value_type: VariableValueType
    setId: string
    name: string
    isStatic?: boolean
  }) => void
  setActiveSet: (val: string) => void
  activeSet: string | null
  updateVariableSet: (params: { name: string; _id: string }) => void
  updateVariable: (params: {
    _id: string
    name: string
    value: number | string
  }) => void
}

const BuilderVariablesContext = createContext<
  BuilderVariablesContextType | undefined
>(undefined)

export const BuilderVariablesProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [variables, setVariables] = useState<VariableData[]>([])
  const [variableSets, setVariableSets] = useState<VariableSetData[]>([])
  const [activeSet, setActiveSet] = useState<string | null>(null)

  const createVariableSet = (name: string) => {
    if (name) {
      let newSetID = generateRandomId(9)
      setVariableSets((prev) => [
        ...prev,
        {
          _id: newSetID,
          name,
          slug: slugify(name),
          index: prev.length + 1,
          editEnabled: true,
        },
      ])
      setActiveSet(newSetID)
    }
  }

  const updateVariableSet = ({ name, _id }: { name: string; _id: string }) => {
    setVariableSets((prev) =>
      prev.map((set) =>
        set._id === _id
          ? { ...set, name, slug: slugify(name), editEnabled: false }
          : set,
      ),
    )
  }

  const deleteSetByID = async (_id: string) => {
    setVariableSets((prev) => prev.filter((set) => set._id !== _id))
    setVariables((prev) =>
      prev.filter((variable) =>
        typeof variable.set === 'string'
          ? variable.set !== _id
          : variable.set._id !== _id,
      ),
    )
    if (activeSet === _id) {
      setActiveSet(null)
    }
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
    const set = variableSets.find((s) => s._id === setId)
    if (!set) return

    const newVariable: VariableData = {
      _id: generateRandomId(9),
      name,
      slug: slugify(name),
      index:
        variables.filter((v) =>
          typeof v.set === 'string' ? v.set === setId : v.set._id === setId,
        ).length + 1,
      value_type,
      set: setId,
      isStatic,
      value: value_type === 'number' ? 16 : '',
    }

    setVariables((prev) => [...prev, newVariable])
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
    setVariables((prev) =>
      prev.map((variable) =>
        variable._id === _id
          ? { ...variable, name, slug: slugify(name), value }
          : variable,
      ),
    )
  }

  const value: BuilderVariablesContextType = {
    activeSet,
    setActiveSet,
    variables,
    setVariables,
    variableSets,
    setVariableSets,
    createVariableSet,
    deleteSetByID,
    addAVariableToSet,
    updateVariableSet,
    updateVariable,
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
