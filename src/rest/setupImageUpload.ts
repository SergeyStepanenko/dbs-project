import isEmpty from 'lodash/isEmpty'
import { Application } from 'express'
import { Request, Response } from 'express-serve-static-core'
import { UploadedFile } from 'express-fileupload'

export default function setupImageUpload(app: Application) {
  app.post('/imageUpload', (req: Request, res: Response) => {
    try {
      if (isEmpty(req.files)) {
        return res.status(400).send('No files were uploaded.')
      }

      let image = req.files.image as UploadedFile

      image.mv(`files/images/${image.md5}`, (err) => {
        if (err) {
          return res.status(500).send(err)
        }

        res.send('File uploaded!')
      })
    } catch (error) {
      throw new Error('Image uploading failure')
    }
  })
}
