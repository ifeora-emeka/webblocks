import { useEffect } from 'react'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'

type Props = {} & WithRendererProps

function BuilderKeyMapper({ builderHook, rendererState }: Props) {
  const { removeElementFromPage, changeElementPosition } = builderHook
  const { active_element } = rendererState

  const initializeHotkeys = () => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Delete':
          if (active_element) {
            removeElementFromPage({ dnd_id: active_element.dnd_id })
          }
          break
        case 'ArrowUp':
          if (event.ctrlKey && active_element) {
            changeElementPosition({
              element_id: active_element.dnd_id,
              direction: 'up',
            })
          }
          break
        case 'ArrowDown':
          if (event.ctrlKey && active_element) {
            changeElementPosition({
              element_id: active_element.dnd_id,
              direction: 'down',
            })
          }
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
