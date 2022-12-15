import { useStoreMap } from 'effector-react'
import { $projectPrismaGeneratorSettings } from '@renderer/modules/settings/stores'
import { Stack } from '@mantine/core'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

export const PrismaGeneratorSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const { provider, output } = useStoreMap({
    store: $projectPrismaGeneratorSettings,
    keys: [settingsId],
    fn: (settings, [id]) => settings.get(id)!
  })

  return (
    <SettingsSectionPaper>
      <Stack>
        {/* <Text>{settingsId}</Text> */}
        <EnvInput
          label="Provider"
          description="Describes which generator  to use. This can point to a file that implements a generator or specify a built-in generator directly."
          value={provider.value}
          isEnv={provider.isEnv}
          required
        />
        <EnvInput
          label="Output"
          description="Determines the location for the generated client. Default: node_modules/.prisma/client"
          value={output?.value || ''}
          isEnv={output?.isEnv ?? false}
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
