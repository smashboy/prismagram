import { useStore, useStoreMap } from 'effector-react'
import { Stack } from '@mantine/core'
import { $schemaDatasources, $schemaState } from '@renderer/modules/editor'
import { prismaDatasourceProvidersArray, prismaRelationModesList } from 'prisma-state/constants'
import { Datasource } from 'prisma-state/_new/blocks'
import { SelectOptionInput } from './SelectOptionInput'
import { EnvInput } from './EnvInput'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

export const PrismaDatasourceSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const state = useStore($schemaState)

  const datasourceData = useStoreMap({
    store: $schemaDatasources,
    keys: [settingsId],
    fn: (datasources, [id]) => datasources.get(id)!
  })

  const datasource = new Datasource(datasourceData.name, state, datasourceData)

  return (
    <Stack pr="md">
      <SelectOptionInput
        label="Provider"
        description="Describes which data source connectors to use."
        block={datasource}
        name="provider"
        data={prismaDatasourceProvidersArray}
        searchable
        required
      />
      <EnvInput
        label="Url"
        description="Connection URL including authentication info."
        name="url"
        block={datasource}
        required
      />
      <EnvInput
        label="Shadow database url"
        description="Connection URL to the shadow database used by Prisma Migrate. Allows you to use a cloud-hosted database as the shadow database."
        name="shadowDatabaseUrl"
        block={datasource}
      />
      <SelectOptionInput
        label="Relation mode"
        description="Sets whether referential integrity is enforced by foreign keys in the database or emulated in the Prisma Client."
        block={datasource}
        name="relationMode"
        data={prismaRelationModesList as unknown as string[]}
        searchable
        clearable
      />
    </Stack>
  )
}
