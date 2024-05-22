'use client'
import React from 'react'
import { PageElementData } from '@/types/builder.types'
import { cn } from '@/lib/utils'

const TheElement: React.FC<{ element: PageElementData }> = ({ element }) => {
  const { type: ElementType, attributes, children, style } = element
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
                element={child as PageElementData}
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
  element: PageElementData
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
  element: PageElementData
}) {
  return <TheElement element={element} />
}
