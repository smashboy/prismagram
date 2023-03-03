import { useEffect } from 'react'
import { useStore } from 'effector-react'
import { ReactFlowProvider } from 'reactflow'
import { Group, MantineProvider, Paper, Stack } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { Editor } from './modules/editor'
import { CreateProjectModal, getProjectsListEffect, ProjectSelectorModal } from './modules/projects'
import { loadGlobalSettingsEffect, SettingsModal } from './modules/settings'
import { Spotlight, useGeneralShortcuts } from './modules/spotlight'
import { useUpdatesManager } from './core/hooks'
import { ConfirmCloseApplicationModal } from './core/components'
import { $appTheme } from './stores/ui/theme'
import { theme } from './core/theme'
import 'reactflow/dist/style.css'
import './transports'

function App() {
  const appTheme = useStore($appTheme)

  useGeneralShortcuts()
  useUpdatesManager()

  useEffect(() => {
    loadGlobalSettingsEffect()
    getProjectsListEffect()
  }, [])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme(appTheme)}>
      <NotificationsProvider>
        <ReactFlowProvider>
          <Group w="100%" h="100%" spacing={0} noWrap>
            <Stack w="100%" h="100%" spacing={0} sx={{ flex: 1 }}>
              <Paper
                w="100%"
                h="100%"
                style={{
                  transition: 'width 400ms ease',
                  overflow: 'hidden',
                  borderRadius: 0
                }}
              >
                <Editor />
              </Paper>
            </Stack>
            <SettingsModal />
            <CreateProjectModal />
            <ProjectSelectorModal />
            <ConfirmCloseApplicationModal />
            <Spotlight />
          </Group>
        </ReactFlowProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
