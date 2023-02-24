import { Button, Group, Stack, Text } from '@mantine/core'
import { appName, appVersion, invoke } from '@renderer/core/electron'
import { APP_UPDATE_CHECK } from '@shared/common/configs/api'
import { IconBrandGithub, IconBug, IconEdit } from '@tabler/icons'
import { capitalize } from 'lodash'
import { SettingsSection } from '../SettingsSection'
import { SettingsSectionPaper } from '../SettingsSectionPaper'

export const AboutAppSettings = () => {
  const handleCheckForUpdates = () => invoke(APP_UPDATE_CHECK)

  return (
    <SettingsSection>
      <Stack h="100%">
        <SettingsSectionPaper title="Updates">
          <Stack>
            <Text>{`${capitalize(appName)} version ${appVersion}`}</Text>
            <Button onClick={handleCheckForUpdates} w="max-content">
              Check for updates
            </Button>
          </Stack>
        </SettingsSectionPaper>
        <SettingsSectionPaper title="Links">
          <Group>
            <Button
              href="https://github.com/smashboy/prismagram"
              target="_blank"
              rel="noopener noreferrer"
              component="a"
              leftIcon={<IconBrandGithub />}
            >
              Source code
            </Button>
            <Button
              href="https://github.com/smashboy/prismagram/issues/new?assignees=&labels=bug&template=bug_report.md&title="
              target="_blank"
              rel="noopener noreferrer"
              component="a"
              leftIcon={<IconBug />}
            >
              Report a bug
            </Button>
            <Button
              href="https://github.com/smashboy/prismagram/issues/new?assignees=&labels=enhancement&template=feature_request.md&title="
              target="_blank"
              rel="noopener noreferrer"
              component="a"
              leftIcon={<IconEdit />}
            >
              Suggest a feature
            </Button>
          </Group>
        </SettingsSectionPaper>
      </Stack>
    </SettingsSection>
  )
}
