import { useEffect } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { Group, Stack } from '@mantine/core'
import { Editor, EditorToolbar } from './modules/editor'
import { CreateProjectModal, getProjectsListEffect, ProjectSelectorModal } from './modules/projects'
import { loadGlobalSettingsEffect, SettingsModal } from './modules/settings'
import { Spotlight, useGeneralShortcuts } from './modules/spotlight'
import 'reactflow/dist/style.css'
import './transports'
import 'prisma-state/PrismaSchemaState'
import { PaperGlass } from './core/components'

function App() {
  // const { isOpen, isOpenDebounced } = useStore($isOpenDetailsView)

  useGeneralShortcuts()

  // const isRighSidebarOpen = isOpen ? isOpenDebounced : isOpen

  useEffect(() => {
    loadGlobalSettingsEffect()
    getProjectsListEffect()
  }, [])

  return (
    <ReactFlowProvider>
      <Spotlight>
        <Group w="100%" h="100%" spacing={0} noWrap>
          {/* <Sidebar /> */}
          <Stack w="100%" h="100%" spacing={0} sx={{ flex: 1 }}>
            <EditorToolbar />
            <PaperGlass
              // w={isRighSidebarOpen ? 'calc(100vw - 650px)' : 'calc(100vw - 290px)'}
              w="100%"
              h="100%"
              // withBorder
              style={{
                transition: 'width 400ms ease',
                overflow: 'hidden'
                // borderRadius: 0,
                // borderTopWidth: 0,
                // borderBottomWidth: 0
              }}
            >
              <Editor />
            </PaperGlass>
          </Stack>
          {/* <RightSidebar /> */}
          <SettingsModal />
          <CreateProjectModal />
          <ProjectSelectorModal />
        </Group>
      </Spotlight>
    </ReactFlowProvider>
  )
}

export default App
