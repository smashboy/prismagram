import { useStore, useStoreMap } from 'effector-react'
import { combine } from 'effector'
import { Stack } from '@mantine/core'
import { $schemaGenerators, $schemaState } from '@renderer/modules/editor'
import { $prismaSettings } from '@renderer/modules/settings/stores'
import { prismaBinaryTargetsList, prismaEngineTypesList } from 'prisma-state/constants'
import { Generator } from 'prisma-state/_new/blocks'
import { EnvInput } from './EnvInput'
import { MultipleOptionsSelect } from './MultipleOptionsSelect'
import { SelectOptionInput } from './SelectOptionInput'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

const engineTypeOptions = prismaEngineTypesList
const binaryTargetsOptions = prismaBinaryTargetsList

const $store = combine({
  settings: $prismaSettings,
  state: $schemaState
})

export const PrismaGeneratorSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const {
    settings: { previewFeaturesList },
    state
  } = useStore($store)

  const generatorData = useStoreMap({
    store: $schemaGenerators,
    keys: [settingsId],
    fn: (settings, [id]) => settings.get(id)!
  })

  const generator = new Generator(generatorData.name, state, generatorData)

  return (
    <Stack pr="md">
      <EnvInput
        label="Provider"
        description="Describes which generator  to use. This can point to a file that implements a generator or specify a built-in generator directly."
        block={generator}
        name="provider"
        required
      />
      <EnvInput
        label="Output"
        description="Determines the location for the generated client. Default: node_modules/.prisma/client"
        block={generator}
        name="output"
      />
      <MultipleOptionsSelect
        label="Preview features"
        name="previewFeatures"
        block={generator}
        data={previewFeaturesList}
        searchable
        clearable
      />
      <SelectOptionInput
        label="Engine type"
        description="Defines the query engine type to download and use. Default: library"
        name="engineType"
        block={generator}
        data={engineTypeOptions as unknown as string[]}
        searchable
        clearable
      />
      <MultipleOptionsSelect
        label="Binary targets"
        description="Specify the OS on which the Prisma Client will run to ensure compatibility of the query engine. Default: native"
        name="binaryTargets"
        block={generator}
        data={binaryTargetsOptions as unknown as string[]}
        searchable
        clearable
      />
    </Stack>
  )
}
