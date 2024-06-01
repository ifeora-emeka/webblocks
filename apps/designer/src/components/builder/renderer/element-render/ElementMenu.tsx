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
  TbLayoutList,
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
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'
import { DndElementData } from '@repo/designer/types/designer.types'
import { StaticElement } from '@/components/builder/renderer/element-render/static-element-data/static-element.types'
import { getStaticElement } from '@/components/builder/renderer/element-render/static-element-data/static-element.utils'
import { ChakraProps } from '@chakra-ui/react'

type Props = {
  children: any
  onOpenChange: (e: boolean) => void
  element: DndElementData
} & WithRendererProps

function ElementMenu({ children, onOpenChange, builderHook, element }: Props) {
  const { appendChildToParentElement, updateElementChakraStyleData } =
    builderHook
  const isRootElement = !element.element_data.parent_element_id

  const addElement = (type: StaticElement) => {
    appendChildToParentElement({
      parent_id: element.element_data.element_id,
      newChild: getStaticElement({
        type,
        parent_id: element.element_data.element_id,
        index: 0,
      }),
    })
  }

  const updateChakraStyle = (style: ChakraProps) => {
    updateElementChakraStyleData({
      element_id: element.element_data.element_id,
      newChakraStyle: style,
    })
  }

  return (
    <>
      <DropdownMenu onOpenChange={onOpenChange}>
        <DropdownMenuTrigger className={'py-0'} asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark bg-card">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-default_spacing">
              <TbPlus /> Add element
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                className={'dark bg-card text-card-foreground'}
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
                className={'dark bg-card text-card-foreground'}
              >
                <DropdownMenuItem
                  className="gap-default_spacing"
                  onClick={() =>
                    updateChakraStyle({
                      display: 'flex',
                      flexFlow: 'column',
                      placeContent: 'center',
                      alignItems: 'center',
                    })
                  }
                >
                  <TbLayoutRows /> Vertical stack
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-default_spacing"
                  onClick={() =>
                    updateChakraStyle({
                      display: 'flex',
                      flexFlow: 'row',
                      placeContent: 'center',
                      alignItems: 'center',
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

export default withRenderer(ElementMenu)
