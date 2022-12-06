import { useState } from 'react'
import { invoke } from '../electron'

export const useEndpoint = <T, P>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)

  const invokeEndpoint = async (args: P) => {
    const res = await invoke(endpoint, args)
    setData(res)
  }

  return [data, invokeEndpoint] as const
}
