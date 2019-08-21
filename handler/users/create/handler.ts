import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import 'source-map-support/register';
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import * as AWS from "aws-sdk";

const docClient: DocumentClient = new AWS.DynamoDB.DocumentClient({
  // 参考：https://www.npmjs.com/package/serverless-dynamodb-local
  region: 'localhost',
  endpoint: 'http://localhost:3030',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
});

// 参考: https://techsparx.com/software-development/aws/aws-sdk-promises.html

// 別ファイルからクラスメソッドを呼び出す場合はそのメソッドがasyncとなりうまくいかなかったため一旦この方向で
export const createUser = async (
  event: APIGatewayProxyEvent,
  _context: Context
) => {
  const body: object = JSON.parse(event['body']);
  const params: DocumentClient.PutItemInput = {
    TableName: 'usersTable',
    Item: {
      userId: body['userId']
    },
    ConditionExpression: 'attribute_not_exists(userId)'
  };
  try {
    await docClient.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({userId: body['userId']})
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: '違うuserIdで登録してください'})
    };
  }
};
