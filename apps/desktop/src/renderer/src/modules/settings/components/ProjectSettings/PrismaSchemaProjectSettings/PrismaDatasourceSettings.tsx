import { useStoreMap } from 'effector-react'
import { Select, Stack } from '@mantine/core'
import {
  prismaDatasourceProvidersArray,
  prismaRelationModesList
} from '@shared/common/configs/prisma'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'
import { $schemaDatasources } from '@renderer/modules/editor'
import { OptionField, EnvField } from 'prisma-state/fields'

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

  const provider = datasource.field<OptionField>('provider')
  const url = datasource.field<EnvField>('url')
  const shadowDatabaseUrl = datasource.field<EnvField>('shadowDatabaseUrl')
  const relationMode = datasource.field<OptionField>('relationMode')

  return (
    <SettingsSectionPaper title="Datasource">
      <Stack>
        {/* <Text>{settingsId}</Text> */}
        <Select
          label="Provider"
          description="Describes which data source connectors to use."
          value={provider?.value ?? ''}
          data={prismaDatasourceProvidersArray}
          searchable
          required
        />
        <EnvInput
          label="Url"
          description="Connection URL including authentication info."
          value={url?.value ?? ''}
          isEnv={url?.isEnv ?? false}
          required
        />
        <EnvInput
          label="Shadow database url"
          description="Connection URL to the shadow database used by Prisma Migrate. Allows you to use a cloud-hosted database as the shadow database."
          value={shadowDatabaseUrl?.value ?? ''}
          isEnv={shadowDatabaseUrl?.isEnv ?? false}
        />
        <Select
          label="Relation mode"
          description="Sets whether referential integrity is enforced by foreign keys in the database or emulated in the Prisma Client."
          value={relationMode?.value ?? ''}
          data={prismaRelationModesList as unknown as string[]}
          searchable
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
