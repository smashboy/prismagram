import { useStoreMap } from 'effector-react'
import { Select, Stack } from '@mantine/core'
import {
  PrismaDatasourceProvider,
  prismaDatasourceProvidersArray
} from '@shared/common/configs/prisma'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'
import { $schemaDatasources } from '@renderer/modules/editor'
import { Assignment } from '@mrleebo/prisma-ast'
import { cleanupAssignmentValue, extractAssignmentValue } from '@renderer/modules/settings/utils'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

export const PrismaDatasourceSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const { assignments: lines } = useStoreMap({
    store: $schemaDatasources,
    keys: [settingsId],
    fn: (datasources, [id]) => datasources.get(id)!
  })

  const assignments = lines.filter((a) => a.type === 'assignment') as Assignment[]

  const provider = assignments.find((a) => a.key === 'provider') || {
    type: 'assignment',
    key: 'provider',
    value: ''
  }

  const url = assignments.find((a) => a.key === 'url') || {
    type: 'assignment',
    key: 'url',
    value: ''
  }

  const providerValue = cleanupAssignmentValue(provider.value as string)

  const urlInput = extractAssignmentValue(url)

  return (
    <SettingsSectionPaper>
      <Stack>
        {/* <Text>{settingsId}</Text> */}
        <Select
          label="Provider"
          description="Describes which data source connectors to use."
          value={providerValue}
          data={prismaDatasourceProvidersArray}
          required
        />
        <EnvInput
          label="Url"
          description="Connection URL including authentication info"
          value={urlInput.value}
          isEnv={urlInput.isEnv}
          required
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
