class BaseService {
    constructor(protected model: any) {}
  
    
    public findAll = async () => {
      return await this.model.find();
    };
  
    public createOne = async (data: any) => {
      const newRecord = await new this.model(data);
      return await newRecord.save();
    };
    public findOneAndDelete = async (email: string) => {
      return await this.model.findOneAndDelete({ email });
    };
    public deleteById = async (id: string) => {
      return await this.model.findByIdAndRemove(id);
    };
    public getById = async (id: string) => {    
      const user = await this.model.findById(id);
      return user;
    };
    public getByEmail = async (email: string) => {    
      const user = await this.model.findOne(email);
      return user;
    };
    public updateById = async (id: string, data: any) => {
      const user = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return user;
    };
  }
  
  export default BaseService;
  