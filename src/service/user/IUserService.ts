import IUSER from "../../utils/interface/user/IUser";
import IUPDATEUSER from "../../utils/interface/user/IUpdateUser";
import { IResponse } from "../../utils/interface/common";
import { Request, Response } from "express";

export interface IUserServiceAPI {
    create(request: IRegisterUserRequest, response: IRegisterUserResponse): void;

}

/********************************************************************************
 *  Create user
 ********************************************************************************/
export interface IRegisterUserRequest extends Request {
    body: {
        firstname: string;
        lastname:string,
        email: string;
        password: string;
        role:string;
    }
}

export interface IRegisterUserResponse extends IResponse {
    user?: IUSER;
}





/********************************************************************************
 *  update user
 ********************************************************************************/


export interface IUpdateUserRequest extends Request {
    params: {
        id: string;
    },
    body: {
        firstname?: string;
        lastname?: string;
        email?: string;
        password?: string;
        role?: string;
    }
}


export interface IUpdateUserResponse extends IResponse {
    user?: IUPDATEUSER;
}

