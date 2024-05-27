import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import
{
  DndElementData,
} from '@repo/designer/types/designer.types';
import { generateRandomId, getRandomNumber } from '@/lib/utils';
import { HeroSection } from '@/app/mock-data';

export interface RendererState
{
  allElements: DndElementData[];
  active_dnd_id: string | null;
}

const initialState: RendererState = {
  allElements: HeroSection(),
  active_dnd_id: null,
};

export const rendererSlice = createSlice({
  name: 'renderer',
  initialState,
  reducers: {
    setRendererState: (
      state,
      action: PayloadAction<Partial<RendererState>>,
    ) =>
    {
      console.log('SETTING RENDER STATE::', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    addElement: (state, action: PayloadAction<DndElementData>) =>
    {
      let theID = generateRandomId(getRandomNumber(8, 13));
      const newElement: DndElementData = {
        ...action.payload,
        dnd_id: theID,
        element_data: {
          ...action.payload.element_data,
          element_id: theID,
        },
      };
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
        };
      }
    },
    removeElement: (state, action: PayloadAction<string>) =>
    {
      state.allElements = state.allElements.filter(
        (element) => element.element_data.element_id !== action.payload,
      );
    },
    moveElement: (
      state,
      action: PayloadAction<{ element_id: string; direction: 'up' | 'down'; }>,
    ) =>
    {
      // const _state: RendererState = JSON.parse(JSON.stringify(state));
      // const { element_id, direction } = action.payload;



      // console.log(direction);

      // const targetElement = _state.allElements.find(
      //   (el: DndElementData) => el.dnd_id === element_id,
      // );

      // if (!targetElement) return;

      // const siblings: DndElementData[] = _state.allElements.filter(
      //   (el: DndElementData) => el.parent_dnd_id === targetElement.parent_dnd_id,
      // );

      // console.log('OLD SIBLINGS:::', siblings);

      // const targetIndex = siblings.findIndex(el => el.dnd_id === targetElement.dnd_id);

      // if (targetIndex === -1) return;

      // let newIndex = direction === 'up' ? targetIndex - 1 : targetIndex + 1;
      // if (newIndex < 0) newIndex = siblings.length - 1;
      // if (newIndex >= siblings.length) newIndex = 0;

      // const temp = siblings[ targetIndex ];
      // siblings[ targetIndex ] = siblings[ newIndex ];
      // siblings[ newIndex ] = temp;

      // siblings.forEach((sibling, index) =>
      // {
      //   sibling.element_data.index = index;
      //   sibling.index = index;
      // });


      // let updatedElements = _state.allElements.map(el =>
      // {
      //   let siblingIndex = siblings.findIndex(x => x.dnd_id === el.dnd_id);
      //   if (siblingIndex !== -1) {
      //     return siblings[ siblingIndex ];
      //   } else {
      //     return el;
      //   }
      // });

      // console.log('NEW SIBLINGS:::', siblings);

      // return {
      //   ..._state,
      //   allElements: updatedElements
      // };


      const { element_id, direction } = action.payload;

      const elementIndex = state.allElements.findIndex(
        (element) => element.dnd_id === element_id,
      );

      if (elementIndex === -1) return state; // Element not found

      let newIndex = elementIndex;

      // Calculate the new index based on the direction
      if (direction === 'up' && elementIndex > 0) {
        newIndex = elementIndex - 1;
      } else if (direction === 'down' && elementIndex < state.allElements.length - 1) {
        newIndex = elementIndex + 1;
      }

      if (newIndex < 0 || newIndex >= state.allElements.length) return;

      const [ movedElement ] = state.allElements.splice(elementIndex, 1);
      state.allElements.splice(newIndex, 0, movedElement);



      state.allElements.forEach((element, index) =>
      {
        element.element_data.index = index;
        element.index = index;
      });


      console.log(elementIndex);



    }

  },
});

export const { moveElement, setRendererState, removeElement, addElement } =
  rendererSlice.actions;

export default rendererSlice.reducer;
