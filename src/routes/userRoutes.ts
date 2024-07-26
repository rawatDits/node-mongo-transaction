import proxy from "../service/appServiceProxy";
import { userRoutes } from '../helper/routes';

const userRoute = async (app: any) => {
	app.post(userRoutes.UsersRoute, proxy.user.create);
};

export default userRoute;
