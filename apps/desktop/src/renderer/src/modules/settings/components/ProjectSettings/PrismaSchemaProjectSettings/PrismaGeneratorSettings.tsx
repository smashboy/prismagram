import { useStore, useStoreMap } from 'effector-react'
import { MultiSelect, Stack } from '@mantine/core'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'
import { $schemaGenerators } from '@renderer/modules/editor'
import { $prismaSettings } from '@renderer/modules/settings/stores'
import { prismaBinaryTargetsList, prismaEngineTypesList } from '@shared/common/configs/prisma'
import { OptionsListField } from 'prisma-state/fields'
import { SelectOptionInput } from '../../SelectOptionInput'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

const engineTypeOptions = prismaEngineTypesList
const binaryTargetsOptions = prismaBinaryTargetsList

export const PrismaGeneratorSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const { previewFeaturesList } = useStore($prismaSettings)

  const generator = useStoreMap({
    store: $schemaGenerators,
    keys: [settingsId],
    fn: (settings, [id]) => settings.get(id)!
  })

  const previewFeatures = generator.field<OptionsListField>('previewFeatures')
  // const binaryTargets = generator.field<OptionsListField>('binaryTargets')

  const previewFeatureOptions = Array.from(
    new Set([...(previewFeatures?.options.values() || []), ...previewFeaturesList])
  )

  return (
    <SettingsSectionPaper title="Generator">
      <Stack>
        {/* <Text>{settingsId}</Text> */}
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
        <MultiSelect
          label="Preview features"
          value={previewFeatures ? [...previewFeatures.options.values()] : []}
          data={previewFeatureOptions}
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
        <MultiSelect
          label="Binary targets"
          description="Specify the OS on which the Prisma Client will run to ensure compatibility of the query engine. Default: native"
          value={[]}
          data={binaryTargetsOptions as unknown as string[]}
          searchable
          clearable
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
