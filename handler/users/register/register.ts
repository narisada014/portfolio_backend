interface ReturnHash {
  statusCode: number;
  body: string;
}
// 例えばこのRegisterクラスにユーザー情報の登録がくると仮定してみる
export default class Register {
  main(): ReturnHash  {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
      })
    }
  }
}
