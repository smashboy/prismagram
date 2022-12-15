import { useStoreMap } from 'effector-react'
import { $projectPrismaGeneratorSettings } from '@renderer/modules/settings/stores'
import { Stack } from '@mantine/core'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'
import { extractAssignmentValue } from '@renderer/modules/settings/utils'
import { $schemaGenerators } from '@renderer/modules/editor'
import { Assignment } from '@mrleebo/prisma-ast'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

export const PrismaGeneratorSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const { assignments: lines } = useStoreMap({
    store: $schemaGenerators,
    keys: [settingsId],
    fn: (settings, [id]) => settings.get(id)!
  })

  const assignments = lines.filter((a) => a.type === 'assignment') as Assignment[]

  const provider = assignments.find((a) => a.key === 'provider') || {
    type: 'assignment',
    key: 'provider',
    value: ''
  }

  const output = assignments.find((a) => a.key === 'output') || {
    type: 'assignment',
    key: 'output',
    value: ''
  }

  const providerInput = extractAssignmentValue(provider)
  const outputInput = extractAssignmentValue(output)

  return (
    <SettingsSectionPaper>
      <Stack>
        {/* <Text>{settingsId}</Text> */}
        <EnvInput
          label="Provider"
          description="Describes which generator  to use. This can point to a file that implements a generator or specify a built-in generator directly."
          value={providerInput.value}
          isEnv={providerInput.isEnv}
          required
        />
        <EnvInput
          label="Output"
          description="Determines the location for the generated client. Default: node_modules/.prisma/client"
          value={outputInput.value}
          isEnv={outputInput.isEnv}
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
