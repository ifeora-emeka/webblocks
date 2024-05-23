'use client'
import React from 'react'
import { DesignerElementData, DesignerElementDataDTO } from '@repo/designer/types/designer.types'
import { cn } from '@/lib/utils'

const TheElement: React.FC<{ element: DesignerElementData | DesignerElementDataDTO }> = ({
  element,
}) => {
  const { html_tag: ElementType, attributes, children, style } = element
  const devMode = true

  return (
    <HoverToolBar element={element}>
      <ElementType
        {...attributes}
        style={element.style}
        builder-id={element.element_id}
        className={cn(
          Object.values(element.tailwindStyle).join(' '),
          element.attributes.className,
        )}
      >
        {children &&
          children.map((child) =>
            typeof child === 'string' ? (
              <>{child}</>
            ) : (
              <TheElement
                key={child.element_id}
                element={child as DesignerElementData}
              />
            ),
          )}
      </ElementType>
    </HoverToolBar>
  )
}

function HoverToolBar({
  children,
  element,
}: {
  children: any
  element: DesignerElementData | DesignerElementDataDTO
}) {
  let devMode = true

  if (!devMode) {
    return <>{children}</>
  }

  return (
    <>
      <div className="hover:outline hover:outline-1 hover:outline-red-500 hover:shadow-lg cursor-pointer">
        {children}
      </div>
    </>
  )
}

export default function ElementRenderer({
  element,
}: {
  element: DesignerElementData | DesignerElementDataDTO
}) {
  return <TheElement element={element} />
}
