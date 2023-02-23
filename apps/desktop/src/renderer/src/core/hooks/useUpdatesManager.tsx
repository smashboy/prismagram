import { useEffect } from 'react'
import { Button, Group } from '@mantine/core'
import { hideNotification, showNotification } from '@mantine/notifications'
import {
  APP_UPDATE_AVAILABLE,
  APP_UPDATE_CHECK,
  APP_UPDATE_DOWNLOAD,
  APP_UPDATE_DOWNLOADED,
  APP_UPDATE_ERROR,
  APP_UPDATE_NOT_AVAILABLE
} from '@shared/common/configs/api'
import { IconAlertTriangle } from '@tabler/icons'
import { AppUpdateProgress } from '../components'
import { invoke, ipcRenderer } from '../electron'

const appUpdateProgressNotificationId = 'app-update-progress-notification'
const appUpdateDownloadedNotificationId = 'app-update-downloaded-notification'

export const useUpdatesManager = () => {
  const handleDownloadUpdate = () => {
    invoke(APP_UPDATE_DOWNLOAD)
    handleShowUpdateProgressNotification()
  }

  const handleShowUpdateNotification = () =>
    showNotification({
      id: 'app-update-available-notification',
      title: 'New update is available. Would you like to install it right now?',
      message: (
        <Button variant="subtle" onClick={handleDownloadUpdate}>
          Update
        </Button>
      ),
      autoClose: false
    })

  const handleShowUpdateErrorNotification = () =>
    showNotification({
      id: 'app-update-error-notification',
      title: 'App update error!',
      message:
        'An error occurred while downloading the update. Please restart the app and try again.',
      color: 'red',
      icon: <IconAlertTriangle />
    })

  const handleShowUpdateProgressNotification = () =>
    showNotification({
      id: appUpdateProgressNotificationId,
      title: 'An update is in progress, please do not close the application.',
      message: <AppUpdateProgress />,
      autoClose: false,
      disallowClose: true
    })

  const handleShowUpdateNotAvailable = () =>
    showNotification({
      id: 'app-update-not-available-notification',
      title: 'There are no new updates',
      message: 'You have the latest version.'
    })

  const handleCloseShowUpdateDownloaded = () => hideNotification(appUpdateDownloadedNotificationId)

  const handleShowUpdateDownloaded = () => {
    hideNotification(appUpdateProgressNotificationId)
    showNotification({
      id: appUpdateDownloadedNotificationId,
      title: 'Update downloaded successfully, install it now?',
      autoClose: false,
      message: (
        <Group>
          <Button variant="subtle" color="gray" onClick={handleCloseShowUpdateDownloaded}>
            Later
          </Button>
          <Button variant="subtle">Install</Button>
        </Group>
      )
    })
  }

  useEffect(() => {
    invoke(APP_UPDATE_CHECK)

    ipcRenderer.on(APP_UPDATE_AVAILABLE, handleShowUpdateNotification)
    ipcRenderer.on(APP_UPDATE_ERROR, handleShowUpdateErrorNotification)
    ipcRenderer.on(APP_UPDATE_NOT_AVAILABLE, handleShowUpdateNotAvailable)
    ipcRenderer.on(APP_UPDATE_DOWNLOADED, handleShowUpdateNotAvailable)

    return () => {
      ipcRenderer.removeListener(APP_UPDATE_AVAILABLE, handleShowUpdateNotification)
      ipcRenderer.removeListener(APP_UPDATE_ERROR, handleShowUpdateErrorNotification)
      ipcRenderer.removeListener(APP_UPDATE_NOT_AVAILABLE, handleShowUpdateNotAvailable)
    }
  }, [])
}
