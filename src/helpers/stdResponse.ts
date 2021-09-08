import { Response } from "express"

const response = (res:Response, message:string ,  status?:number, data?:object | any[]) =>{
  let success = true
  if(!status){
      status = 200
  }
  if(status >= 400){
      success = false
  }
  return res.json({
      success,
      message,
      data
  })
}
export default response
