'use client'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'

import {
  mediaElements,
  structureElements,
  typographyElements,
} from './element-options-data/element-data'
import { useDraggable } from '@dnd-kit/core'
import {
    getDraggableElement,
} from '../../../../../../../packages/designer/elements/getDragableElement'


export default function BuilderElementOptions() {
  return (
    <>
      <BuilderLeftPanelContainer heading="Elements" actions={[]}>
        <div className="grid grid-cols-3 gap-default_spacing p-default_spacing">
          {structureElements?.map((val) => {
            return (
              <EachElement
                slug={val.slug}
                key={crypto.randomUUID()}
                label={val?.label}
                content={val.preview}
              />
            )
          })}
        </div>
        <div className="grid grid-cols-3 gap-default_spacing p-default_spacing">
          {typographyElements?.map((val) => {
            return (
              <EachElement
                slug={val.slug}
                key={crypto.randomUUID()}
                content={val.preview}
                label={val.label}
              />
            )
          })}
        </div>
        <div className="grid grid-cols-3 gap-default_spacing p-default_spacing">
          {mediaElements?.map((val) => {
            return (
              <EachElement
                slug={val.slug}
                key={crypto.randomUUID()}
                content={val.preview}
                label={val.label}
              />
            )
          })}
        </div>
      </BuilderLeftPanelContainer>
    </>
  )
}

const EachElement = ({
  content,
  label,
  slug,
}: {
  label: string
  content: any
  slug: string
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: slug,
      data: {
        ...getDraggableElement('div'),
        isElement: true,
        isBlock: false,
      },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: 1000,
  }

  if (isDragging) {
    return (
      <div className="flex justify-center items-center p-2 min-h-[80px] max-h-[80px] bg-background rounded-md  cursor-grab flex-col gap-default_spacing"></div>
    )
  }

  return (
    <div
      className="flex justify-center items-center p-2 min-h-[80px] max-h-[80px] bg-background/30 rounded-md hover:bg-accent hover:shadow-md cursor-grab hover:text-white/80 flex-col gap-default_spacing"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {content}
      <small>{label}</small>
    </div>
  )
}
