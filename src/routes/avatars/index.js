import multer from 'multer'
import { IS_PROD } from '../../config'
import { uploadAvatar } from './post'
import createMongoDBService from '../../services/mongo-db'
import createS3Service from '../../services/s3'
import { authentication } from '../middleware'

const { authenticateJSONWebToken, authenticateAsAdmin } = authentication

const avatarsRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)
  const s3Service = createS3Service(config)

  const upload = multer({
    storage: multer.memoryStorage(),
    // file size limitation in bytes
    limits: { fileSize: 52428800 },
  })

  app.post(
    '/avatars',
    authenticateJSONWebToken,
    authenticateAsAdmin,
    upload.single('avatar'),
    uploadAvatar(mongoDBService, s3Service)
  )
}

export default avatarsRoutesFactory
