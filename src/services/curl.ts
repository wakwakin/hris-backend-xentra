import { exec } from 'child_process'
import { schemas } from './schema'

const args = process.argv.slice(2)

if (args.includes('--list')) {
  console.log('\nAvailable APIs:\n')
  for (const api in schemas) {
    console.log(`${api}`)
    for (const method in schemas[api]) {
      console.log(` - ${method}`)
    }
  }
  console.log('') // extra newline
  process.exit(0)
}

const [api, method = 'GET'] = args

if (!api) {
  console.error('Usage: yarn curl <api> <method>')
  process.exit(1)
}

function findSchema(apiPath: string, method: string) {
  if (schemas[apiPath]) return schemas[apiPath][method.toUpperCase()] ?? null

  for (const key of Object.keys(schemas)) {
    if (key.includes(':')) {
      const regexString =
        '^' + key.replace(/:([a-zA-Z0-9_]+)/g, '([^/]+)') + '$'
      const regex = new RegExp(regexString)
      if (regex.test(apiPath)) {
        return schemas[key][method.toUpperCase()] ?? null
      }
    }
  }

  return null
}

const bodyData = findSchema(api, method)

let cmd = `curl -s -X ${method.toUpperCase()} http://localhost:3000/${api} -H 'Content-Type: application/json'`

if (bodyData) {
  const bodyJson = JSON.stringify(bodyData)
  cmd += ` -d '${bodyJson}'`
}

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(stderr)
  }

  console.log(cmd)

  try {
    const json = JSON.parse(stdout)
    console.log(JSON.stringify(json, null, 2))
  } catch {
    console.log(stdout)
  }
})
