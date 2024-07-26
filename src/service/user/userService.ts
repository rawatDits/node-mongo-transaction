
import UserStore from "./userStore";
import RoleStore from "../role/roleStore";
import IUSER from "../../utils/interface/user/IUser";
import STATUS_CODES from "../../utils/enum/statusCodes";
import ErrorMessageEnum from "../../utils/enum/errorMessage";
import responseMessage from "../../utils/enum/responseMessage";
import * as IUserService from "./IUserService";
import { IAppServiceProxy } from "../appServiceProxy";
import { IApiResponse, toError } from "../../utils/interface/common";
import { apiResponse } from "../../helper/apiResponses";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export default class UserService implements IUserService.IUserServiceAPI {
    private userStore = new UserStore();
    private roleStore = new RoleStore();
    private proxy: IAppServiceProxy;
    constructor(proxy: IAppServiceProxy) {
        this.proxy = proxy;
    }

    public create = async (req: IUserService.IRegisterUserRequest,
        res: IUserService.IRegisterUserResponse,) => {
        const response: IApiResponse = {
            response: res,
            statusCode: STATUS_CODES.UNKNOWN_CODE,
            message: responseMessage.INVALID_EMAIL_OR_CODE,
            data: null,
            status: false
        };
       
        let user: IUSER;
        const {firstname, lastname  , email, password, role } = req.body;

        // Start  Session 
        const session = await mongoose.startSession();
     
        try {
            // Start Transaction
            (await session).startTransaction();

            const hashPassword = await bcrypt.hash(password, 10);
            const attributes: IUSER = {
                firstname,
                lastname,
                email: email.toLowerCase(),
                password: hashPassword,
            };
            //Save data in user table
            const userCreate:IUSER[] = await this.userStore.createUser(attributes, session);
            if(userCreate.length>0){
               user = userCreate?.[0];
            }
            //save data in user Role Table
            const roleAttribute = {userId: user?._id,name:role}
            await this.roleStore.createRole(roleAttribute,session)
            console.log("Role Saved in Role table");

            // Commit Transaction 
            (await session).commitTransaction;
            console.log("Transaction committed.");

            response.statusCode = STATUS_CODES.OK
            response.message = responseMessage.USER_CREATED
            response.data = user
            response.status = true
            response.error = null
            return apiResponse(response);            
           

        } catch (e) {
            (await session).abortTransaction()
            console.error(e);
            response.statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = ErrorMessageEnum.INTERNAL_ERROR
            response.data = null
            response.status = false
            response.error = toError(e.message)
            return apiResponse(response);
        }
        finally {
            (await session).endSession()
          }
    };
}
