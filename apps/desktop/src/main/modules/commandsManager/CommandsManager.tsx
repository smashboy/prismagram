import child_process, { ChildProcess } from 'child_process'
import { randomUUID } from 'crypto'

type CommandOptions = Record<string, boolean | string | number>

interface RunCommandOptions {
  execDirectory?: string
  id?: string
}

export default class CommandsManager {
  private readonly processes = new Map<string, ChildProcess>()

  private buildCommandOptionsString(options: CommandOptions) {
    return Object.entries(options).reduce((acc, [cmd, value]) => {
      if (!value) return acc

      if (typeof value === 'boolean') return (acc += `--${cmd} `)
      return (acc += `--${cmd} ${value} `)
    }, '')
  }

  runCommand(command: string, options: CommandOptions, settings: RunCommandOptions) {
    return new Promise((resolve) => {
      const commandString = `${command} ${this.buildCommandOptionsString(options)}`

      console.log('EXECUTING COMMAND:', commandString)

      const proc = child_process.exec(
        commandString,
        { cwd: settings.execDirectory },
        (error, stdout, stderr) => {
          console.log('EXECUTING COMMAND RESULT:', commandString, { error, stdout, stderr })
        }
      )

      this.processes.set(settings.id ?? randomUUID(), proc)
      resolve(void 0)
    })
  }

  hasProcess(id: string) {
    return this.processes.has(id)
  }

  killProcess(id: string) {
    const process = this.processes.get(id)
    if (process) {
      this.processes.delete(id)
      process.kill('SIGINT')
      // if (process.pid) {
      //   psTree(process.pid, (_, children) =>
      //     child_process.spawn('kill', ['-9'].concat(children.map((p) => p.PID)))
      //   )
      // }
    }
  }

  killAllProcesses() {
    for (const process of [...this.processes.values()]) {
      // if (process.pid) {
      //   psTree(process.pid, (_, children) =>
      //     child_process.spawn('kill', ['-9'].concat(children.map((p) => p.PID)))
      //   )
      // }
      process.kill('SIGINT')
    }

    this.processes.clear()
  }
}
