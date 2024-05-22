import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import BuilderElementOptions from './elements-options/BuilderElementOptions'
import BuilderPageOptions from './pages-options/BuilderPagesOptions'
import BuilderBlocksOptions from './blocks-options/BuilderBlocksOptions'

export default function LeftNavOptions() {
  const { panel } = useSelector((state: AppStore) => state.builder_view)
  switch (panel) {
    case 'elements':
      return <BuilderElementOptions />
    case 'pages':
      return <BuilderPageOptions />
    case 'blocks':
      return <BuilderBlocksOptions />
    default:
      return null
  }
}
