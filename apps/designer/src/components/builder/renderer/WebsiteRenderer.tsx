'use client'
import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { compileAllDndElements } from '@/components/builder/builder.utils'
import { defaultRootElement } from '@/components/builder/renderer/element-render/static-element-data/default-body'
import { setRendererState } from '@/redux/features/renderer/renderer.slice'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import FrameElementRenderer from '@/components/builder/renderer/frame-element-renderer/FrameElementRenderer'

interface ElementRendererProps {

}

const WebsiteRenderer: React.FC<ElementRendererProps> = ({ }) => {
  const dispatch = useDispatch();
  const { allElements } = useSelector((state:AppStore) => state.renderer)

  useEffect(() => {
    if (allElements.length == 0) {
      let rootEl = defaultRootElement({
        index: 0,
        parent_id: null,
      })

      dispatch(
        setRendererState({
          allElements: [rootEl],
          active_element: [rootEl],
        }),
      )
    }
  }, [allElements])

  return (
    <>
        {allElements.length > 0 ? (
          <>
            <FrameElementRenderer element={compileAllDndElements(allElements)} />
          </>
        ) : null}
    </>
  )

  // return (
  //   <>
  //       <div
  //         className={cn('bg-white  overflow-hidden', {
  //           'min-h-[calc(100vh-50px-1rem)]': allElements.length == 0,
  //         })}
  //       >
  //         {allElements.length > 0 ? (
  //           <>
  //             <FrameElementRenderer element={compileAllDndElements(allElements)} />
  //           </>
  //         ) : null}
  //       </div>
  //   </>
  // )
}

export default WebsiteRenderer
