import Amplify,{ Auth } from 'aws-amplify';
import { APIGatewayProxyEvent } from 'aws-lambda';

interface SignUpResponse {
  body: string;
  statusCode: number;
}

Amplify.configure({
  Auth: {
    identityPoolId: 'ap-northeast-1:250789126509:userpool/ap-northeast-1_a3yCNQQ9J', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'ap-northeast-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'ap-northeast-1_a3yCNQQ9J', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '6qhkodrdmji8u90vgjvam5k7jb', //OPTIONAL - Amazon Cognito Web Client ID
  },
});

export default class Register {
  async main(event: APIGatewayProxyEvent): Promise<SignUpResponse> {
    const body: object = JSON.parse(event.body);
    return await Auth.signUp(body["email"], body["password"], body["email"])
      .then((data) => {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: data.user.getUsername()
          })
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'UsernameExistsException') {
          return {
            statusCode: 400,
            body: JSON.stringify({
              message: 'UsernameExistsException'
            })
          }
        }
        return
      });
  }
}