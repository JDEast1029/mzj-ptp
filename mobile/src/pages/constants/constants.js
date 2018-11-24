/**
 * 目前在开发环境可以使用Redux Devtools。
 * 可以在src/page/xxx/constatns/constants.js中的DEBUG里控制开关
 * true开启，false关闭。
 */
export const DEBUG = !0;
/**
 * 开发模式结合PHP后端
 * true开启，false关闭
 * 即!0后端。!1前端:3000端口
 */
export const DEV_WITH_SERVER = !0;

const OSS_IMG = "https://wya-xqb.oss-cn-qingdao.aliyuncs.com/common/wap/";

export const MAIN_BG = OSS_IMG + "mine_bg.png";
export const INVITE_NOT_FOUND = OSS_IMG + "invalid_pink.png";
export const LIVE_LIST_NOT_FOUND = OSS_IMG + "invalid_blue.png";
export const NO_PERMISSION_GB = OSS_IMG + "no_ permission.png";
export const CROWD_NONE_BG = OSS_IMG + "crowd_none_bg.png";
export const ERROR_CLIENT_BG = OSS_IMG + 'error_client.png';
