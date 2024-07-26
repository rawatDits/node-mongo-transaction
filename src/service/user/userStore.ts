import IUSER from "../../utils/interface/user/IUser";
import { UserModel } from "../../db/model/users";

export default class UserStore {
	public static OPERATION_UNSUCCESSFUL = class extends Error {
		constructor() {
			super("An error occured while processing the request.");
		}
	};
	/**
	 * creating new user and saving in Database
	 */
	public async createUser(userInput: IUSER, session:any): Promise<any> {
		// eslint-disable-next-line no-useless-catch
		try {
			const getuser = await UserModel.findOne({email:'ra@gmail.com'});
			console.log('getuser: ', getuser);
			const savedUser = await UserModel.create([userInput],  {session} );
			return savedUser;
		} catch (error) {
			console.log("error in user creation", error)
			throw error; 
		}
	}
}
