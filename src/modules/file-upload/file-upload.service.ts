import { Injectable } from '@nestjs/common';
import { configService } from '../../config/config.service';
import { S3UploaderService } from '../s3-uploader/s3-uploader.service';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly s3UploaderService: S3UploaderService,
  ) // private readonly s3FolderPathsService: S3FolderPathsService,
  {}

  async create(file: Express.Multer.File) {
    let contentType = 'image/jpeg';
    if (file.mimetype) contentType = file.mimetype;
    const s3UploadedObject = await this.s3UploaderService.uploadS3(
      file.buffer,
      configService.getValue('S3_BUCKET_NAME'),
      'files/',
      file.originalname,
      {
        ContentEncoding: 'base64',
        ContentType: contentType,
      },
    );

    return { url: s3UploadedObject.Location };
  }
}
