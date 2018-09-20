export const uploadAvatar = (mongoDBService, s3Service) => (req, res) => {
  s3Service.upload(req.file)
    .then(upload => mongoDBService.updateProducerAvatar(upload, req.file, req.body.user_id))
    .then(data => {
      const { previousFileKey } = data.data

      if (previousFileKey) {
        s3Service.deleteFile(data.data.previousFileKey)
          .catch(err => console.log(err))
      }

      return res.json(data)
    })
    .catch(err => {
      res.status(err.statusCode).send(err)
    })
}
