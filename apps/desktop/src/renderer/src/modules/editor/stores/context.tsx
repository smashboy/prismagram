import { useStore } from 'effector-react'
import { createContext, useContext } from 'react'
import { $selectedModelNode } from './diagram'

//  Cant use effector store directly in nodes FOR FUCK SAKE???!!?!?!

const Context = createContext<string | null>(null)

export const TestProvider = ({ children }) => {
  const selectedModelNode = useStore($selectedModelNode)

  return <Context.Provider value={selectedModelNode}>{children}</Context.Provider>
}

export const useTestStore = () => useContext(Context)
