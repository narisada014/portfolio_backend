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
    const bookParams: DocumentClient.PutItemInput = {
        TableName: 'booksTable',
        Item: {
            bookId: body['bookId'],
            title: body['title'],
            content: body['content'],
            url: body['url'],
            index: body['index'],
            collectionId: body['collectionId']
        },
        ConditionExpression: 'attribute_not_exists(bookId)'
    };
    try {
        await docClient.put(bookParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({message: "本の登録が完了しました"})
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'もう一度お試しください'})
        };
    }
};