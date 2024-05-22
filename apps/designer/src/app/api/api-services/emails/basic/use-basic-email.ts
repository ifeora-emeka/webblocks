import path from 'path'
import fs from 'fs/promises' // Use fs.promises for async file operations

export const useBasicEmail = async ({
  html_content,
  heading,
}: {
  html_content: string
  heading: string
}): Promise<string> => {
  try {
    const theDir = path.join(
      process.cwd(),
      './src/app/api/api-services/emails/basic/basic.html',
    )

    const buffer = await fs.readFile(theDir, 'utf-8') // Use fs.promises.readFile
    let fileContent = buffer.toString()

    console.log('\n USING BASIC EMAIL \n')

    fileContent = fileContent.replace('__HEADING__', heading || '')
    fileContent = fileContent.replace('__CONTENT__', html_content)

    // console.log('THE TEMPLATE::', fileContent)

    return fileContent
  } catch (error) {
    console.error('FILE READ ERROR --', error)
    throw new Error('Failed to read default email file')
  }
}
