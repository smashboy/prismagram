import { useStoreMap } from 'effector-react'
import { Stack } from '@mantine/core'
import {
  prismaDatasourceProvidersArray,
  prismaRelationModesList
} from '@shared/common/configs/prisma'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'
import { $schemaDatasources } from '@renderer/modules/editor'
import { SelectOptionInput } from '../../SelectOptionInput'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

export const PrismaDatasourceSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const datasource = useStoreMap({
    store: $schemaDatasources,
    keys: [settingsId],
    fn: (datasources, [id]) => datasources.get(id)!
  })

  return (
    <SettingsSectionPaper title="Datasource">
      <Stack>
        {/* <Text>{settingsId}</Text> */}
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
    </SettingsSectionPaper>
  )
}
