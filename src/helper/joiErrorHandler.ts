import { IError } from "../utils/interface/common"
export const JoiError = (error: any): IError => {
    const err: IError = {
        message: "something went wrong!",
        error: [],
    }
    err.error = [];
    error.details.forEach(element => {
        err.error.push({
            message: element.message,
            inputValue: element.context.value
        })
    });
    return err;
}
