import { useEffect } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { Group, Paper, Stack } from '@mantine/core'
import { Editor } from './modules/editor'
import { CreateProjectModal, getProjectsListEffect, ProjectSelectorModal } from './modules/projects'
import { loadGlobalSettingsEffect, SettingsModal } from './modules/settings'
import { Spotlight, useGeneralShortcuts } from './modules/spotlight'
import 'reactflow/dist/style.css'
import './transports'

import 'prisma-state/_new/state'
import 'prisma-state/PrismaSchemaState'
import { useUpdatesManager } from './core/hooks'

function App() {
  useGeneralShortcuts()
  useUpdatesManager()

  useEffect(() => {
    loadGlobalSettingsEffect()
    getProjectsListEffect()
  }, [])

  return (
    <ReactFlowProvider>
      <Spotlight>
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
        </Group>
      </Spotlight>
    </ReactFlowProvider>
  )
}

export default App
