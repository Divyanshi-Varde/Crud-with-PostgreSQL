import {Request,Response} from "express"
import { deleteServices, getServices, readServices, updateServices } from "../services/route.services";


export const getController = async (req: Request, res: Response):Promise<any> => {
  const getResponse = await getServices();
  res.json(getResponse.users)

};


export const readController = async (req: Request, res: Response) :Promise<any>=> {
  const id = Number(req.params.id);

  const readResponse = await readServices(id);
  res.json(readResponse.user)
  
};

export const updateController = async (req: Request, res: Response) :Promise<any>=> {
  const id = Number(req.params.id);
  const body = req.body;
  
  const updateResponse = await updateServices(body,id);
  res.status(updateResponse.code).json({message:updateResponse.message,updatedUser:updateResponse.updatedUser})
};

export const deleteController = async(req: Request, res: Response):Promise<any>=> {
  const id = Number(req.params.id);

  const deleteResponse=await deleteServices(id)
 res.status(deleteResponse.code).json({message:deleteResponse.message,deletedUser:deleteResponse.deletedUser}) 
};