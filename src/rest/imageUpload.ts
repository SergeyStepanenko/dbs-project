import sharp from 'sharp'
import { Request } from 'express-serve-static-core'
import { Response } from 'express'

type RequestImage = Request & {
  files: {
    image: {
      mv: any
      md5: string
      data: any
    }
  }
}

export default function imageUploadMethod(app) {
  app.post('/imageUpload', async (req: RequestImage, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }

    const image = req.files.image

    sharp(image.data).toFile(`files/images/orig/${image.md5}.png`, (err) => {
      if (err) {
        throw new Error('Image conversion failed')
      }
    })

    sharp(image.data)
      .resize(320, 320, { fit: 'outside' })
      .png()
      .toFile(`files/images/360_360/${image.md5}.png`, (err) => {
        if (err) {
          throw new Error('Image conversion failed')
        }
      })

    res.send({ id: image.md5 })
  })
}
