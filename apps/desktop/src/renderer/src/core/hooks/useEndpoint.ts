import { useState } from 'react'
import { invoke } from '../electron'

export const useEndpoint = <T = unknown, P = unknown>(endpoint: string, initialState?: T) => {
  const [data, setData] = useState<T>(initialState ?? null)
  const [isLoading, setIsLoading] = useState(false)

  const invokeEndpoint = async (args?: P, beforeSet?: (res: T) => T) => {
    try {
      setIsLoading(true)
      const res = await invoke(endpoint, args)
      setData(beforeSet?.(res) ?? res)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetState = () => setData(initialState ?? null)

  return [data, { isLoading, invoke: invokeEndpoint, reset: handleResetState }] as const
}
