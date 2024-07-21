import { useEffect } from 'react'
import withRenderer, { WithRendererProps } from '@/components/builder/HOCs/WithRenderer'
import { getStaticElement } from '@/components/builder/renderer/element-render/static-element-data/static-element.utils'
import { DndElementData } from '@repo/designer/types/designer.types'

type Props = {} & WithRendererProps

function BuilderKeyMapper({ builderHook, rendererState }: Props) {
  const {
    removeElementFromPage,
    changeElementPosition,
    duplicateElementData,
    groupSelectedElementData,
    appendChildToParentElement
  } = builderHook
  const { active_element } = rendererState

  const initializeHotkeys = () => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const addElement = (type: string) => {
        if (active_element && active_element.length === 1) {
          const parent_id = active_element[0].dnd_id
          const newChild: DndElementData = getStaticElement({ type, parent_id, index: 0 })
          appendChildToParentElement({ parent_id, newChild })
        }
      }

      if (event.altKey) {
        switch (event.key) {
          case 'h':
            event.preventDefault()
            addElement('heading')
            break
          case 'f':
            event.preventDefault()
            addElement('frame')
            break
          case 'p':
            event.preventDefault()
            addElement('paragraph')
            break
          case 'b':
            event.preventDefault()
            addElement('button')
            break
          case 'i':
            event.preventDefault()
            addElement('image')
            break
          case 'l':
            event.preventDefault()
            addElement('link')
            break
          default:
            break
        }
      }

      switch (event.key) {
        case 'Delete':
          if (active_element && event.ctrlKey) {
            event.preventDefault()
            removeElementFromPage({
              dnd_ids: active_element.map((el) => el.dnd_id),
            })
          }
          break
        case 'ArrowUp':
          if (event.ctrlKey && active_element && active_element.length === 1) {
            event.preventDefault()
            changeElementPosition({
              element_id: active_element[0].dnd_id,
              direction: 'up',
            })
          }
          break
        case 'ArrowDown':
          if (event.ctrlKey && active_element && active_element.length === 1) {
            event.preventDefault()
            changeElementPosition({
              element_id: active_element[0].dnd_id,
              direction: 'down',
            })
          }
          break
        case 'd':
          if (event.ctrlKey && active_element && active_element.length === 1) {
            event.preventDefault()
            duplicateElementData({ element_id: active_element[0].dnd_id })
          }
          break
        case 'g':
          if (event.ctrlKey && active_element.length > 1) {
            event.preventDefault()
            groupSelectedElementData()
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }

  useEffect(() => {
    const cleanup = initializeHotkeys()

    return () => {
      cleanup()
    }
  }, [active_element])

  return <></>
}

export default withRenderer(BuilderKeyMapper)
