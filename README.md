## ポートフォリオのサーバサイド(サーバレス)

# ローカル起動方法
以下のコマンドを実行し、
http://localhost:3000/helloにアクセス可能なことを確認
```
yarn install
sls dynamodb install
sls offline start
```
# dynamoDBローカルについて
https://www.npmjs.com/package/serverless-dynamodb-local

