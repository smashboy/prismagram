import { useEffect, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Stack, Text } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { PrismaSchemaStateInstance } from 'prisma-state/_new/types'
import { $createRelationModalData, $selectedRelationType } from '../../stores'
import { formatSchema } from '@renderer/core/utils'
import { BlockBase } from 'prisma-state/_new/blocks'

// const added = { color: 'blue' }

interface PreviewSchemaChangesProps {
  state: PrismaSchemaStateInstance
}

const $store = combine({
  data: $createRelationModalData,
  selectedRelationType: $selectedRelationType
})

export const PreviewSchemaChanges: React.FC<PreviewSchemaChangesProps> = ({ state }) => {
  const { data, selectedRelationType } = useStore($store)

  const { source, target, isExplicit } = data

  const [preview, setPreview] = useState('')

  useEffect(() => {
    const handleCreatePreview = async () => {
      const preview = await formatSchema(`
        ${BlockBase._toString(state.model(target), state)}
        ${BlockBase._toString(state.model(source), state)}
        ${
          selectedRelationType === 'n-m' && isExplicit
            ? BlockBase._toString(state.model(`${source}On${target}`), state)
            : ''
        }
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
