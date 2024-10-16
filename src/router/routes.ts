import { RouteRecordRaw } from "vue-router";
import homeRoutes from "./home";
// 导入其他路由模块
import loginRoutes from "./login";
import videoRoutes from "./video";
import channelRoutes from "./channel";

const routes: Array<RouteRecordRaw> = [
  ...homeRoutes,
  ...loginRoutes,
  ...videoRoutes,
  ...channelRoutes,
];

export default routes;
