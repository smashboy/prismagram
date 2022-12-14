import { useStoreMap } from 'effector-react'
import { $projectPrismaDatasourceSettings } from '@renderer/modules/settings'
import { Select, Stack, TextInput } from '@mantine/core'
import { prismaDatasourceProvidersArray } from '@shared/common/configs/prisma'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

export const PrismaDatasourceSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const { provider, url } = useStoreMap({
    store: $projectPrismaDatasourceSettings,
    keys: [settingsId],
    fn: (settings, [id]) => settings.get(id)!
  })

  return (
    <SettingsSectionPaper>
      <Stack>
        {/* <Text>{settingsId}</Text> */}
        <Select
          label="Provider"
          description="Describes which data source connectors to use."
          value={provider}
          data={prismaDatasourceProvidersArray}
          required
        />
        <EnvInput
          label="Url"
          description="Connection URL including authentication info"
          value={url.value}
          isEnv={url.isEnv}
          required
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
