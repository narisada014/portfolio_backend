import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context} from 'aws-lambda';
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
export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    _context: Context
) => {
    const body: object = JSON.parse(event['body']);
    // TODO コレクションID作成ロジックを HashIds で
    const collectionParams: DocumentClient.PutItemInput = {
        TableName: 'collectionsTable',
        Item: {
            collectionId: 'collectionId',
            userId: body['userId'],
            name: body['name']
        },
        ConditionExpression: 'attribute_not_exists(collectionId)'
    };
    try {
        await docClient.put(collectionParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({collectionId: 'collectionId'})
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'もう一度お試しください'})
        };
    }
};