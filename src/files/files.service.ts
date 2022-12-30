import { Injectable } from '@nestjs/common';
import {
  IFilesServiceUploadFile,
  IFilesServiceUploadFiles,
} from './interfaces/files-service.interface';
import { Storage } from '@google-cloud/storage';
import { getToday } from 'src/commons/libraries/utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async uploadFile({ file }: IFilesServiceUploadFile): Promise<string> {
    const bucket = process.env.GCP_BUCKET_NAME;
    const storage = new Storage({
      projectId: process.env.GCP_ID,
      keyFilename: '/my-secret/gcp-file-storage.json',
    }).bucket(bucket);

    const result = new Promise<string>((resolve, reject) => {
      const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
      file
        .createReadStream()
        .pipe(storage.file(fname).createWriteStream())
        .on('finish', () =>
          resolve(`https://storage.googleapis.com/${bucket}/${fname}`),
        )
        .on('error', () => reject('실패'));
    });
    return result;
  }

  async uploadFiles({ files }: IFilesServiceUploadFiles): Promise<string[]> {
    const bucket = process.env.GCP_BUCKET_NAME;
    const storage = new Storage({
      projectId: process.env.GCP_ID,
      keyFilename: '/my-secret/gcp-file-storage.json',
    }).bucket(bucket);

    const waitedFiles = await Promise.all(files);
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            const fname = `${getToday()}/${uuidv4()}/origin/${el.filename}`;

            el.createReadStream()
              .pipe(storage.file(fname).createWriteStream())
              .on('finish', () =>
                resolve(`https://storage.googleapis.com/${bucket}/${fname}`),
              )
              .on('error', () => reject('실패'));
          }),
      ),
    );

    // 2. 다운로드 URL 브라우저에 돌려주기
    return results;
  }
}
