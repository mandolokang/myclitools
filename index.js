const fs = require('fs')
const path = require('path')

let args = process.argv.slice(2).toString().split(',')

if (args.length > 0) {
  if (['-h', '--h', '--help', 'help'].includes(args[0])) {
    help()
    return
  }

  let filePath = null
  let transformExtension = null
  let targetDirectory = './storages/'
  args.forEach((element, index) => {
    if (['-f', '--f', '--file', 'file'].includes(element)) {
      filePath = args[index + 1]
    }

    if (['-t', '--t', '--transform', 'transform'].includes(element)) {
      transformExtension = args[index + 1]
    }

    if (['-o', '--o', '--output', 'output'].includes(element)) {
      targetDirectory = args[index + 1]
    }
  })

  if (filePath != null && transformExtension != null) {
    transformData(filePath, transformExtension, targetDirectory)
    return
  }

  home()
}

function home() {
  console.log('==========================================')
  console.log('File Transformer')
  console.log('Transform Your Log File Into [json, text]')
  console.log('==========================================')
  help()
}

function help() {
  console.log('Options:')
  console.log('\t -f or --f or --file or file : flags for file origin')
  console.log('\tUsages:')
  console.log('\t\t node index.js -f {file_path}')
  console.log('\t\t e.g: node.index.js -f /Documents/Folder/error.log')
  console.log('\n')

  console.log(
    '\t -t or --t or --transform or transform : flags for transform file extension \n'
  )
  console.log('\tUsages:')
  console.log('\t\t node index.js -f {file_path} -t {file_format}')
  console.log(
    '\t\t e.g: node.index.js -f /Documents/Folder/error.log -t json/text'
  )
  console.log('\t\t Available file format: JSON || TEXT')
  console.log('\n')

  console.log(
    '\t -o or --o or --output or output : flags for file target output directory'
  )
  console.log('\tUsages:')
  console.log(
    '\t\t node index.js -f {file_path} -t {file_format} -o {target_output_directory}'
  )
  console.log(
    '\t\t e.g: node.index.js -f /Documents/Folder/error.log -t json -o /Documents/Folder/'
  )
  console.log(
    '\t\tPS: if target output not provide then the result transformed file will be storage at {./storage} folders'
  )
  console.log('\n')
}

function transformData(target, extension, output) {
  const filePath = path.join(__dirname, './', target)
  const fileData = fs.createReadStream(filePath, 'utf8')

  if (extension == 'json') {
    let jsonData = []

    fileData.on('data', (data) => {
      const splitData = data.split('\n')
      splitData.forEach((element) => {
        jsonData.push({ data: element })
      })
    })

    fileData.on('end', () => {
      const data = JSON.stringify(jsonData, null, 2)
      fs.writeFileSync(`${output}/data.json`, data)
    })
  }

  if (extension == 'text') {
    let textData = []

    fileData.on('data', (data) => {
      const splitData = data.split('\n')
      splitData.forEach((element) => {
        textData.push(element)
      })
    })

    fileData.on('end', () => {
      textData.forEach((data) => {
        fs.appendFile(`${output}/data.txt`, `${data}\r\n`, function (err) {
          if (err) throw err
        })
      })
    })
  }
}
