import { useMemo, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { FieldData } from 'prisma-state/_new/types'

export type StableFieldIds = Array<[string, string]> // [uuid, fieldName]

const handleFieldStableIds = (fieldsArray: FieldData[], prevIds: StableFieldIds = []) => {
  const ids: StableFieldIds = []

  for (const field of fieldsArray) {
    const prevId = prevIds.find((id) => id[1] === field.name)

    if (prevId) {
      ids.push(prevId)
      continue
    }

    ids.push([uuid(), field.name])
  }

  return ids
}

export const useStableFieldIds = (fieldsArray: Array<FieldData>) => {
  const prev = useRef<StableFieldIds>([])

  const ids = useMemo(() => {
    const ids = handleFieldStableIds(fieldsArray, prev.current)
    prev.current = ids
    return ids
  }, [fieldsArray])

  const handleSetFieldName = (id: string, name: string) => {
    prev.current = prev.current.map((stableId) => (stableId[0] === id ? [id, name] : stableId))
  }

  return [ids, handleSetFieldName] as const
}
