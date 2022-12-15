import { combine } from 'effector'
import { useStore } from 'effector-react'
import { createContext, useContext } from 'react'
import { $nodesColors } from './diagram'
import { $selectedModelId } from './ui'

//  Cant use effector store directly in nodes FOR FUCK SAKE???!!?!?!

const $store = combine({
  selectedModelNode: $selectedModelId,
  nodesColors: $nodesColors
})

const DiagramEditorContext = createContext<{
  selectedModelNode: string | null
  nodesColors: Record<string, string>
} | null>(null)

export const DiagramEditorContextProvider = ({ children }) => {
  const store = useStore($store)

  return <DiagramEditorContext.Provider value={store}>{children}</DiagramEditorContext.Provider>
}

export const useDiagramEditorStore = () => {
  const ctx = useContext(DiagramEditorContext)

  if (!ctx)
    throw new Error('useDiagramEditorStore must be used within DiagramEditorContextProvider')

  return ctx
}
