import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DndElementData } from '@repo/designer/types/designer.types'
import { generateRandomId, getRandomNumber } from '@/lib/utils'
import { HeroSection } from '@/app/mock-data'

export interface RendererState {
  allElements: DndElementData[]
  active_dnd_id: string | null
}

const initialState: RendererState = {
  allElements: HeroSection(),
  active_dnd_id: null,
}


export const rendererSlice = createSlice({
  name: 'renderer',
  initialState,
  reducers: {
    setRendererState: (
      state,
      action: PayloadAction<Partial<RendererState>>,
    ) => {
      console.log('SETTING RENDER STATE::', action.payload)
      return {
        ...state,
        ...action.payload,
      }
    },
    addElement: (state, action: PayloadAction<DndElementData>) => {
      let theID = generateRandomId(getRandomNumber(8, 13))
      const newElement: DndElementData = {
        ...action.payload,
        dnd_id: theID,
        element_data: {
          ...action.payload.element_data,
          element_id: theID,
        },
      }
      if (newElement.isFromElementPanel) {
        return {
          ...state,
          active_dnd_id: theID,
          allElements: [
            ...state.allElements,
            {
              ...newElement,
              isFromElementPanel: false,
            },
          ],
        }
      }
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.allElements = state.allElements.filter(
        (element) => element.element_data.element_id !== action.payload,
      )
    },
    moveElement: (
      state,
      action: PayloadAction<{ element_id: string; direction: 'up' | 'down' }>
    ) => {
      const { element_id, direction } = action.payload;
      const elementIndex = state.allElements.findIndex(
        (element) => element.dnd_id === element_id
      );

      if (elementIndex === -1) return; // Element not found

      const elementToMove = state.allElements[elementIndex];
      const parentID = elementToMove.parent_dnd_id;

      const siblings = state.allElements.filter(
        (element) => element.parent_dnd_id === parentID
      );

      const siblingIndex = siblings.findIndex(
        (sibling) => sibling.dnd_id === element_id
      );

      if (siblingIndex === -1) return;

      const newIndex =
        direction === 'up' ? siblingIndex - 1 : siblingIndex + 1;

      if (newIndex < 0 || newIndex >= siblings.length) return;

      [siblings[siblingIndex], siblings[newIndex]] = [
        siblings[newIndex],
        siblings[siblingIndex],
      ];

      siblings.forEach((sibling, index) => {
        sibling.index = index;
      });

      state.allElements = state.allElements.map((element) =>
        element.parent_dnd_id === parentID
          ? siblings.find((sibling) => sibling.dnd_id === element.dnd_id) || element
          : element
      );
    }
  },
})

export const { moveElement, setRendererState, removeElement, addElement } =
  rendererSlice.actions

export default rendererSlice.reducer
