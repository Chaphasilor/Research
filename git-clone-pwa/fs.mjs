import { Directory, RootDirectory } from './directory.mjs'
import { File } from './file.mjs'

export async function cloneDirectoryFromJSON(parentDir, json) {

  console.log(`json:`, json)
  
  const parsed = JSON.parse(json)

  let clonedRoot = await cloneDirectoryRecursive(parentDir, parsed)

  // for (const subdir of parsed.directories) {
    
  //   await new Directory(clonedRoot, subdir.name)
    
  // }

  // for (const file of parsed.files) {

  //   const newFile = await new File(clonedRoot, file.name)
  //   await newFile.writeUrl(file.url)
    
  // }
  
}

async function cloneDirectoryRecursive(parentDir, dirObject) {

  let root = await new Directory(parentDir, dirObject.name)

  for (const subdir of dirObject.directories) {
    cloneDirectoryRecursive(root, subdir)
  }

  for (const file of dirObject.files) {
    const newFile = await new File(root, file.name)
    await newFile.writeUrl(file.url)
  }

  return root
  
}

export {
  Directory,
  RootDirectory,
  File,
}
