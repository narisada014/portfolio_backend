import { S3, config } from 'aws-sdk';

config.update({region:"ap-northeast-1"});
const s3 = new S3({ signatureVersion: 'v4' });

export default class Upload {
  main() {
    const url: string = s3.getSignedUrl("putObject", {
      Bucket: "book-collection-dev",
      Key: 'test.png',
      Expires: 60
    });
    return url
  }
}
