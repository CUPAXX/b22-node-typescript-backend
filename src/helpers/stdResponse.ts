import { Response } from "express"

const response = (res:Response, message = "" ,  status = 200, success = true, data?:object | any[]) =>{
  
    const returnData = {
        success,
        message,
        data
    }
  if(status >= 400){
      success = false
  }
  if(data !== null) {
      returnData.data = data
  }
  return res.status(status).json(returnData)
}
export default response
