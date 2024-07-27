import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'

export default function BuilderBlocksOptions() {
  return (
    <>
      <BuilderLeftPanelContainer onSearch={() => {}} heading="Blocks" actions={[]}>
        <h1>Pick a block</h1>
      </BuilderLeftPanelContainer>
    </>
  )
}
