import { FileUpload } from 'graphql-upload';

export interface IFilesServiceUploadFiles {
  files: FileUpload[];
}

export interface IFilesServiceUploadFile {
  file: FileUpload;
}
