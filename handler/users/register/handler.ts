import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import Register from './register';

const register = new Register();
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  console.log(event);
  return register.main()
};