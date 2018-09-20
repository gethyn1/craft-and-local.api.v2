import AWS from 'aws-sdk'
import { upload } from './upload'

const createS3Client = (config) => {
  const { S3_KEY, S3_SECRET, S3_BUCKET, S3_REGION } = config

  AWS.config.region = S3_REGION
  AWS.config.accessKeyId = S3_KEY
  AWS.config.secretAccessKey = S3_SECRET

  return new AWS.S3({
    params: { Bucket: S3_BUCKET },
  })
}

const createS3Service = (config) => {
  const s3Client = createS3Client(config)

  return {
    upload: (file) => upload(s3Client, file)
  }
}

export default createS3Service
