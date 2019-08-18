import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context} from 'aws-lambda';
import 'source-map-support/register';
import Upload from "./upload";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
) => {
  console.log(event)
  const upload = new Upload();
  const url: string = upload.main()
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: url
    })
  }
};