import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  TbBracketsContain,
  TbColumns2,
  TbContainer,
  TbCopy,
  TbEyeClosed,
  TbFrame,
  TbHeading,
  TbLayout,
  TbLayoutGrid,
  TbLayoutRows,
  TbLink,
  TbLock,
  TbPhoto,
  TbPlus,
  TbRectangle,
  TbSection,
  TbTextSize,
  TbTrash,
} from 'react-icons/tb'
import React from 'react'
import {
  ElementData,
  ResponsiveChakraProps,
} from '@repo/designer/types/designer.types'
import { StaticElement } from '@/components/builder/renderer/element-render/static-element-data/static-element.types'
import { getStaticElement } from '@/components/builder/renderer/element-render/static-element-data/static-element.utils'
import { generateStaticBreakpoints } from '@/lib/designer.utils'
import { useRenderer } from '@/components/builder/context/renderer.context'

type Props = {
  children: any
  onOpenChange: (e: boolean) => void
  element: ElementData
} 

function ElementMenu({ children, onOpenChange, element }: Props) {
  const { addElements, updateElementChakraProps } = useRenderer()
  const isRootElement = !element.parent_element_id

  const addElement = (type: StaticElement) => {
    addElements([
      getStaticElement({
        type,
        parent_id: null,
      }),
    ])
  }

  const updateChakraStyle = (style: ResponsiveChakraProps) => {
    updateElementChakraProps(style)
  }

  return (
    <>
      <DropdownMenu onOpenChange={onOpenChange}>
        <DropdownMenuTrigger className={'py-0'} asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-default_spacing">
              <TbPlus /> Add element
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                className={'bg-card text-card-foreground'}
              >
                <DropdownMenuItem
                  className="gap-default_spacing"
                  onClick={() => addElement('heading')}
                >
                  <TbHeading /> Heading
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-default_spacing"
                  onClick={() => addElement('paragraph')}
                >
                  <TbTextSize /> Paragraph
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-default_spacing"
                  onClick={() => addElement('frame')}
                >
                  <TbFrame /> Frame
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-default_spacing">
                  <TbPhoto /> Image
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-default_spacing">
                  <TbLink /> Link
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-default_spacing">
                  <TbRectangle /> Button
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="gap-default_spacing">
                  <TbContainer /> Container
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-default_spacing">
                  <TbSection /> Section
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-default_spacing">
              <TbLayout /> Layout
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                className={'bg-card text-card-foreground'}
              >
                <DropdownMenuItem
                  className="gap-default_spacing"
                  onClick={() =>
                    updateChakraStyle({
                      display: generateStaticBreakpoints('flex'),
                      flexFlow: generateStaticBreakpoints('column'),
                      placeContent: generateStaticBreakpoints('center'),
                      alignItems: generateStaticBreakpoints('center'),
                    })
                  }
                >
                  <TbLayoutRows /> Vertical stack
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-default_spacing"
                  onClick={() =>
                    updateChakraStyle({
                      display: generateStaticBreakpoints('flex'),
                      flexFlow: generateStaticBreakpoints('row'),
                      placeContent: generateStaticBreakpoints('center'),
                      alignItems: generateStaticBreakpoints('center'),
                    })
                  }
                >
                  <TbColumns2 /> Horizontal stack
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-default_spacing">
                  <TbLayoutGrid /> Grid
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {!isRootElement && (
            <>
              <DropdownMenuItem className="gap-default_spacing">
                <TbEyeClosed /> Hide
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-default_spacing">
                <TbCopy /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-default_spacing">
                <TbBracketsContain /> Group
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-default_spacing">
                <TbLock /> Lock
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="gap-default_spacing">
                <TbTrash /> Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ElementMenu
