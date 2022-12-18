import { useStoreMap } from 'effector-react'
import { Select, Stack } from '@mantine/core'
import {
  prismaDatasourceProvidersArray,
  prismaRelationModesList
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

  const shadowDatabaseUrl = assignments.find((a) => a.key === 'shadowDatabaseUrl') || {
    type: 'assignment',
    key: 'shadowDatabaseUrl',
    value: ''
  }

  const providerValue = cleanupAssignmentValue(provider.value as string)

  const urlInput = extractAssignmentValue(url)
  const shadowDatabaseUrlInput = extractAssignmentValue(shadowDatabaseUrl)

  return (
    <SettingsSectionPaper title="Datasource">
      <Stack>
        {/* <Text>{settingsId}</Text> */}
        <Select
          label="Provider"
          description="Describes which data source connectors to use."
          value={providerValue}
          data={prismaDatasourceProvidersArray}
          searchable
          required
        />
        <EnvInput
          label="Url"
          description="Connection URL including authentication info."
          value={urlInput.value}
          isEnv={urlInput.isEnv}
          required
        />
        <EnvInput
          label="Shadow database url"
          description="Connection URL to the shadow database used by Prisma Migrate. Allows you to use a cloud-hosted database as the shadow database."
          value={shadowDatabaseUrlInput.value}
          isEnv={shadowDatabaseUrlInput.isEnv}
        />
        <Select
          label="Relation mode"
          description="Sets whether referential integrity is enforced by foreign keys in the database or emulated in the Prisma Client."
          // value={}
          data={prismaRelationModesList}
          searchable
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
