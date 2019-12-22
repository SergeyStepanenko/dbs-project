export default function imageUploadMethod(app) {
  app.post('/imageUpload', (req: any, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }

    let image = req.files.image

    image.mv(`files/images/${image.md5}`, (err) => {
      if (err) return res.status(500).send(err)

      res.send('File uploaded!')
    })
  })
}
