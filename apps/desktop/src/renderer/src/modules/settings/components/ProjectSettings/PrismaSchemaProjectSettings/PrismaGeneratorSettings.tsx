import { useStore, useStoreMap } from 'effector-react'
import { MultiSelect, Select, Stack } from '@mantine/core'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'
import { $schemaGenerators } from '@renderer/modules/editor'
import { $prismaSettings } from '@renderer/modules/settings/stores'
import { prismaBinaryTargetsList, prismaEngineTypesList } from '@shared/common/configs/prisma'
import { EnvField } from '@renderer/core/prisma/fields/EnvField'
import { OptionsListField } from '@renderer/core/prisma/fields/OptionsListField'
import { OptionField } from '@renderer/core/prisma/fields/OptionField'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

export const PrismaGeneratorSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const { previewFeaturesList } = useStore($prismaSettings)

  const generator = useStoreMap({
    store: $schemaGenerators,
    keys: [settingsId],
    fn: (settings, [id]) => settings.get(id)!
  })

  const provider = generator.field<EnvField>('provider')
  const output = generator.field<EnvField>('output')
  const engineType = generator.field<OptionField>('engineType')
  const previewFeatures = generator.field<OptionsListField>('previewFeatures')
  // const binaryTargets = generator.field<OptionsListField>('binaryTargets')

  const previewFeatureOptions = Array.from(
    new Set([...(previewFeatures?.options.values() || []), ...previewFeaturesList])
  )

  const engineTypeOptions = prismaEngineTypesList
  const binaryTargetsOptions = prismaBinaryTargetsList

  return (
    <SettingsSectionPaper title="Generator">
      <Stack>
        {/* <Text>{settingsId}</Text> */}
        <EnvInput
          label="Provider"
          description="Describes which generator  to use. This can point to a file that implements a generator or specify a built-in generator directly."
          value={provider?.value ?? ''}
          isEnv={provider?.isEnv ?? false}
          required
        />
        <EnvInput
          label="Output"
          description="Determines the location for the generated client. Default: node_modules/.prisma/client"
          value={output?.value ?? ''}
          isEnv={output?.isEnv ?? false}
        />
        <MultiSelect
          label="Preview features"
          value={previewFeatures ? [...previewFeatures.options.values()] : []}
          data={previewFeatureOptions}
          searchable
        />
        <Select
          label="Engine type"
          description="Defines the query engine type to download and use. Default: library"
          value={engineType?.value ?? ''}
          data={engineTypeOptions as unknown as string[]}
          searchable
        />
        <MultiSelect
          label="Binary targets"
          description="Specify the OS on which the Prisma Client will run to ensure compatibility of the query engine. Default: native"
          value={[]}
          data={binaryTargetsOptions as unknown as string[]}
          searchable
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
