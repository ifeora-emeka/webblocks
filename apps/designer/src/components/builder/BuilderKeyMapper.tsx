import { useEffect } from 'react'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'
import { getStaticElement } from '@/components/builder/renderer/element-render/static-element-data/static-element.utils'
import { ElementData } from '@repo/designer/types/designer.types'
import { useDispatch } from 'react-redux'
import { useRenderer } from '@/components/builder/context/renderer.context'

function BuilderKeyMapper() {
  const {
    state: { active_element },
    addElements,
    removeElements,
    duplicateSelected,
    updateElementIndex,
    groupSelected,
    copySelectedElements,
    pasteCopiedElements,
  } = useRenderer()

  const initializeHotkeys = () => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const addElement = (type: string) => {
        if (active_element && active_element?.length === 1) {
          const parent_id = active_element[0]?.id
          const newChild: ElementData = getStaticElement({
            type,
            parent_id,
          })
          addElements([newChild])
          // appendChildToParentElement({ parent_id, newChild })
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
          case 'm':
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
          if (active_element.length > 0 && event.altKey) {
            event.preventDefault()
            removeElements()
          }
          break
        case 'ArrowUp':
          if (event.altKey && active_element && active_element.length === 1) {
            event.preventDefault()
            updateElementIndex('decrement')
          }
          break
        case 'ArrowDown':
          if (event.altKey && active_element && active_element.length === 1) {
            event.preventDefault()
            updateElementIndex('decrement')
          }
          break
        case 'd':
          if (event.altKey && active_element && active_element.length === 1) {
            event.preventDefault()
            duplicateSelected()
          }
          break
        case 'g':
          if (event.altKey && active_element.length > 1) {
            event.preventDefault()
            groupSelected()
          }
          break
        case 'c':
          if (event.altKey) {
            event.preventDefault()
            copySelectedElements()
          }
          break
        case 'v':
          if (event.altKey) {
            event.preventDefault()
            pasteCopiedElements()
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
