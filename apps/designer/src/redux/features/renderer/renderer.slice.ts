import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DndElementData } from '@repo/designer/types/designer.types'
import slugify from 'slugify'
import { generateRandomId } from '@/lib/utils'
import { staticFrameElement } from '@/components/builder/renderer/element-render/static-element-data/frame-element'

export interface RendererState {
  allElements: DndElementData[]
  active_element: DndElementData[]
}

const initialState: RendererState = {
  allElements: [],
  active_element: [],
}

export const rendererSlice = createSlice({
  name: 'renderer',
  initialState,
  reducers: {
    setRendererState: (
      state,
      action: PayloadAction<Partial<RendererState>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    appendChildToParent: (
      state,
      action: PayloadAction<{
        parent_id: string;
        newChild: DndElementData;
      }>,
    ) => {
      const { parent_id, newChild } = action.payload;

      const siblingElements = state.allElements.filter(
        (el: DndElementData) => el.parent_dnd_id === parent_id
      );

      const newElements = state.allElements.map((el: DndElementData) => {
        if (siblingElements.map(sib => sib.dnd_id).includes(el.dnd_id)) {
          return {
            ...el,
            index: el.index + 1,
            element_data: {
              ...el.element_data,
              index: el.index + 1,
            },
          };
        } else {
          return el;
        }
      });

      const newChildElement = {
        ...newChild,
        index: 0,
        parent_dnd_id: parent_id,
        element_data: {
          ...newChild.element_data,
          index: 0,
          parent_element_id: parent_id,
        },
      };

      return {
        ...state,
        allElements: [...newElements, newChildElement],
      };
    },
    moveElement: (
      state,
      action: PayloadAction<{ element_id: string; direction: 'up' | 'down' }>,
    ) => {
      const { element_id, direction } = action.payload

      const elementIndex = state.allElements.findIndex(
        (element) => element.dnd_id === element_id,
      )

      if (elementIndex === -1) return state

      let newIndex = elementIndex

      if (direction === 'up' && elementIndex > 0) {
        newIndex = elementIndex - 1
      } else if (
        direction === 'down' &&
        elementIndex < state.allElements.length - 1
      ) {
        newIndex = elementIndex + 1
      }

      if (newIndex < 0 || newIndex >= state.allElements.length) return

      const [movedElement] = state.allElements.splice(elementIndex, 1)
      state.allElements.splice(newIndex, 0, movedElement)

      state.allElements.forEach((element, index) => {
        element.element_data.index = index
        element.index = index
      })
    },
    removeElement: (state, action: PayloadAction<string[]>) => {
      //todo: delete it's children as well
      let newElements: DndElementData[] = []
      state.allElements.map((el: DndElementData) => {
        if (!action.payload.includes(el.dnd_id)) {
          newElements.push(el)
        }
      })

      return {
        ...state,
        allElements: newElements,
      }
    },
    updateElement: (
      state,
      action: PayloadAction<{ element_id: string; update: DndElementData }>,
    ) => {
      const { element_id, update } = action.payload
      const elementIndex = state.allElements.findIndex(
        (element) => element.dnd_id === element_id,
      )

      if (
        elementIndex !== -1 &&
        !String(state.allElements[elementIndex]?.dnd_id).includes('-root__')
      ) {
        let targetElement = state.allElements[elementIndex]
        //@ts-ignore
        state.allElements[elementIndex] = {
          ...targetElement,
          ...update,
        }
      }
    },
    duplicateElement: (
      state,
      action: PayloadAction<{ element_id: string }>,
    ) => {
      //todo: duplicate it's children also
      const { element_id } = action.payload
      const elementIndex = state.allElements.findIndex(
        (element) => element.dnd_id === element_id,
      )

      if (elementIndex !== -1) {
        let targetElement = state.allElements[elementIndex]
        let duplicateID = generateRandomId(13)
        let duplicate: DndElementData = {
          ...targetElement,
          dnd_id: duplicateID,
          index: targetElement.index + 1,
          element_data: {
            ...targetElement.element_data,
            element_id: duplicateID,
            index: targetElement.index + 1,
            name: targetElement.element_data.name.includes('copy')
              ? targetElement.element_data.name
              : targetElement.element_data.name + ' (copy)',
            slug: slugify(targetElement.element_data.name + ' (copy)'),
          },
        }

        // move all it's siblings down
        state.allElements.map((el: DndElementData, index) => {
          if (
            el.element_data.parent_element_id ===
              targetElement.element_data.parent_element_id &&
            el.element_data.index > targetElement.element_data.index &&
            el.element_data.element_id !== targetElement.element_data.element_id
          ) {
            state.allElements[index] = {
              ...state.allElements[index],
              index: state.allElements[index].index + 1,
              element_data: {
                ...state.allElements[index].element_data,
                index: state.allElements[index].element_data.index + 1,
              },
            }
          }
        })

        //add the duplicates
        state.allElements.push(duplicate as any)
        state.active_element = [duplicate as any]
      }
    },
    selectMultipleElement: (
      state,
      action: PayloadAction<{ element: DndElementData }>,
    ) => {
      let allIDs = state.active_element.map((el: DndElementData) => el.dnd_id)
      let alreadyAdded = allIDs.includes(action.payload.element.dnd_id)

      if (alreadyAdded) {
        return {
          ...state,
          active_element: state.active_element.filter(
            (el: DndElementData) => el.dnd_id !== action.payload.element.dnd_id,
          ),
        }
      } else {
        return {
          ...state,
          active_element: [...state.active_element, action.payload.element],
        }
      }
    },
    groupElements: (state) => {
      if (state.active_element.length === 0) {
        return state
      }

      const newFrameID = generateRandomId(13)
      const newFrameElement = staticFrameElement({
        index: Math.min(...state.active_element.map((el) => el.index)),
        parent_id: state.active_element[0].element_data.parent_element_id,
      })

      newFrameElement.dnd_id = newFrameID
      newFrameElement.element_data.element_id = newFrameID

      const newAllElements = state.allElements.map((el) => {
        if (state.active_element.some((ae) => ae.dnd_id === el.dnd_id)) {
          return {
            ...el,
            parent_dnd_id: newFrameID,
            element_data: {
              ...el.element_data,
              parent_element_id: newFrameID,
            },
          }
        } else if (el.index >= newFrameElement.index) {
          return {
            ...el,
            index: el.index + 1,
            element_data: {
              ...el.element_data,
              index: el.index + 1,
            },
          }
        } else {
          return el
        }
      })

      newAllElements.push(newFrameElement as any)

      const newActiveElements = state.active_element.map((el, idx) => ({
        ...el,
        index: idx,
        element_data: {
          ...el.element_data,
          index: idx,
        },
      }))

      return {
        ...state,
        allElements: newAllElements,
        active_element: [newFrameElement, ...newActiveElements],
      }
    },
  },
})

export const {
  moveElement,
  setRendererState,
  removeElement,
  appendChildToParent,
  updateElement,
  duplicateElement,
  selectMultipleElement,
  groupElements,
} = rendererSlice.actions

export default rendererSlice.reducer
