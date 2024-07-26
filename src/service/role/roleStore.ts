import IROLE from "../../utils/interface/role/IRole";
import { RoleModel } from "../../db/model/roles";

export default class RoleStore {
	public static OPERATION_UNSUCCESSFUL = class extends Error {
		constructor() {
			super("An error occured while processing the request.");
		}
	};

	/**
	 * creating new user and saving in Database
	 */
	public async createRole(roleInput: IROLE, session:any): Promise<any> {
		// eslint-disable-next-line no-useless-catch
		try {
			const savedRole = await RoleModel.create([roleInput],  { session });
			return savedRole;
		} catch (error) {
			throw error;
		}
	}

}
