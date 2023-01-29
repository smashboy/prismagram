import { useEffect } from 'react'
import { useStore } from 'effector-react'
import { Group, Paper, Stack } from '@mantine/core'
import { Editor, EditorToolbar, Sidebar } from './modules/editor'
import { CreateProjectModal, getProjectsListEffect, ProjectSelectorModal } from './modules/projects'
import { loadGlobalSettingsEffect, SettingsModal } from './modules/settings'
import { $isOpenDetailsView } from './stores/ui/modals'
import { RightSidebar } from './modules/editor/components/RightSidebar'
import { Spotlight, useGeneralShortcuts } from './modules/spotlight'
import 'reactflow/dist/style.css'
import './transports'
import 'prisma-state/PrismaSchemaState'
import { ReactFlowProvider } from 'reactflow'

function App() {
  const { isOpen, isOpenDebounced } = useStore($isOpenDetailsView)

  useGeneralShortcuts()

  const isRighSidebarOpen = isOpen ? isOpenDebounced : isOpen

  useEffect(() => {
    loadGlobalSettingsEffect()
    getProjectsListEffect()
  }, [])

  return (
    <ReactFlowProvider>
      <Spotlight>
        <Group w="100%" h="100%" p="xs" noWrap>
          <Sidebar />
          <Stack w="100%" h="100%" sx={{ flex: 1 }}>
            <EditorToolbar />
            <Paper
              w={isRighSidebarOpen ? 'calc(100vw - 690px)' : 'calc(100vw - 330px)'}
              // w="100%"
              h="100%"
              shadow="md"
              sx={{ transition: 'width 400ms ease', overflow: 'hidden' }}
            >
              <Editor />
            </Paper>
          </Stack>
          <RightSidebar />
          <SettingsModal />
          <CreateProjectModal />
          <ProjectSelectorModal />
        </Group>
      </Spotlight>
    </ReactFlowProvider>
  )
}

export default App
