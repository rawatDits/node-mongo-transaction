import IROLE from "../../utils/interface/role/IRole";
import { IResponse } from "../../utils/interface/common";
import { Request } from "express";

export interface IRoleServiceAPI {
    create(request: ICreateRoleRequest, response: ICreateRoleResponse): void;

}

/********************************************************************************
 *  Create Role
 ********************************************************************************/
export interface ICreateRoleRequest extends Request {
    body: {
        name: string;
        userId:string
    }
}

export interface ICreateRoleResponse extends IResponse {
    role?: IROLE;
}
