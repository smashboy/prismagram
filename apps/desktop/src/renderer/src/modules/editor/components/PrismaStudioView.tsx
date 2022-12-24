import { useRef } from 'react'
import { useStore } from 'effector-react'
import { $selectedProject } from '@renderer/modules/projects'
import { DEFAULT_PRISMA_STUDIO_PORT } from '@shared/common/configs/prisma'
import { combine } from 'effector'
import { $isLaunchingPrismaStudio } from '../stores'

const $store = combine({
  project: $selectedProject,
  isLoading: $isLaunchingPrismaStudio
})

export const PrismaStudioView = () => {
  const webviewRef = useRef<HTMLWebViewElement>(null)

  const { project, isLoading } = useStore($store)

  if (!project) return null
  if (isLoading) return 'Is loading studio...'

  return (
    <webview
      ref={webviewRef}
      src={`http://localhost:${project.prismaStudioPort ?? DEFAULT_PRISMA_STUDIO_PORT}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
