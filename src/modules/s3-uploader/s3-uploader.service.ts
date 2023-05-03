import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Logger } from '@nestjs/common';
import { configService } from '../../config/config.service';

@Injectable()
export class S3UploaderService {
  constructor() {}

  public async uploadS3(
    file: any,
    bucket: string,
    folder: string,
    fileName: string,
    otherOptions: any = {},
  ): Promise<S3.ManagedUpload.SendData> {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: `${folder}${Date.now()}-${fileName}`,
      Body: file,
      ...otherOptions,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
          return;
        }
        resolve(data);
      });
    });
  }

  private getS3() {
    return new S3({
      accessKeyId: configService.getValue('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.getValue('AWS_SECRET_ACCESS_KEY'),
      apiVersion: '2006-03-01',
    });
  }
}
