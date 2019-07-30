import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context} from 'aws-lambda';
import 'source-map-support/register';
import Register from "./register";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
) => {
  const register = new Register();
  return await register.main(event);
};