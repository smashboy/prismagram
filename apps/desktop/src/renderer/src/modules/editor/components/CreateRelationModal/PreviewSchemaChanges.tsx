import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { Stack, Text } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { PrismaSchemaStateInstance } from 'prisma-state/_new/types'
import { $createRelationModalData } from '../../stores'
import { formatSchema } from '@renderer/core/utils'
import { BlockBase } from 'prisma-state/_new/blocks'

// const added = { color: 'blue' }

interface PreviewSchemaChangesProps {
  state: PrismaSchemaStateInstance
}

export const PreviewSchemaChanges: React.FC<PreviewSchemaChangesProps> = ({ state }) => {
  const data = useStore($createRelationModalData)

  const { source: sourceModelId, target: targetModelId } = data

  const [preview, setPreview] = useState('')

  useEffect(() => {
    const handleCreatePreview = async () => {
      const sourceModel = state.model(sourceModelId)
      const targetModel = state.model(targetModelId)

      const preview = await formatSchema(`
        ${BlockBase._toString(targetModel, state)}
        ${BlockBase._toString(sourceModel, state)}
      `)

      setPreview(preview)
    }

    handleCreatePreview()
  }, [state])

  return (
    <Stack sx={{ flex: 1 }}>
      <Text>Preview</Text>
      <Prism
        language="json"
        // highlightLines={hightligthLineIndexes.reduce(
        //   (acc, index) => ({ ...acc, [index]: added }),
        //   {}
        // )}
        sx={{ maxHeight: '100%', overflowY: 'auto' }}
        withLineNumbers
        noCopy
      >
        {preview}
      </Prism>
    </Stack>
  )
}
