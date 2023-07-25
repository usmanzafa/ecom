import ReplyResponse from './baseResponse';


class BaseController {
    protected service;
    protected responses: ReplyResponse;
    constructor(model: any, service: any) {
      this.responses = new ReplyResponse();
      this.service = service;
    }
    getAll = async (request: any, reply: any) => {
      try {
        const all = await this.service.findAll();
        if (!all) {
          return this.responses.sendError({
            reply,
            message: "no record found",
          });
        }
        return this.responses.sendSuccess({
          reply,
          message: "all records found",
          data: all,
        });
      } catch (error) {
        return this.responses.sendError({
          reply,
          message: "server Error",
          error: [error],
        });
      }
    };
  
    getOne = async (request: any, reply: any) => {
      try {
        const { id } = request.params;
  
        const one = await this.service.getById(id);
        if (!one) {
          return this.responses.sendError({
            reply,
            message: "doesn't exist",
          });
        }
        return this.responses.sendSuccess({
          reply,
          message: "user found",
          data: one,
        });
      } catch (error) {
        return this.responses.sendError({
          reply,
          message: "server Error",
          error,
        });
      }
    };
    createOne = async (request: any, reply: any) => {
      try {
        const one = await new this.service.createOne(request.body);
        return this.responses.sendSuccess({
          reply,
          message: " created successfully",
          data: one,
        });
      } catch (error) {
        console.log(error)
        return this.responses.sendError({
          reply,
          message: "server Error",
          error: [error],
        });
      }
    };
    deleteById = async (request: any, reply: any) => {
      try {
        const { id } = request.params;
        const user = await this.service.deleteById(id);
        if (!user) {
          return this.responses.sendError({
            reply,
            message: "doesn't exist",
          });
        }
        return this.responses.sendSuccess({
          reply,
          message: "deleted suceessfully",
          data: user,
        });
      } catch (error) {
        return this.responses.sendError({
          reply,
          message: "server Error",
          error: [error],
        });
      }
    };


  }
  
  export default BaseController;