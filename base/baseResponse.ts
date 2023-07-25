interface SuccessResposnelInterface {
  message?: string | null;
  status?: number | null;
  data?: Array<any> | any | null;
}

interface SuccessParamsInterface extends SuccessResposnelInterface {
  reply: any;
}

interface ErrorResposnelInterface {
  message?: string | null;
  status?: number | null;
  error?: any;
}

interface ErrorParamslInterface extends ErrorResposnelInterface {
  reply: any;
}

class ReplyResponse {
  public sendSuccess({
    reply,
    message = "success",
    data = [],
    status = 200,
  }: SuccessParamsInterface): SuccessResposnelInterface {
    return reply.status(200).send({
      message,
      status,
      data,
    });
  }

  public sendError({
    reply,
    message,
    status = 400,
    error,
  }: ErrorParamslInterface): ErrorResposnelInterface {
    return reply.status(200).send({
      message,
      status,
      error: error?.message || error,
    });
  }
}

export default ReplyResponse;
