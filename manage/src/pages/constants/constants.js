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

const OSS_IMG = 'https://wya-xqb.oss-cn-qingdao.aliyuncs.com/common/manage/';
export const ADD_BTN = OSS_IMG + 'add_btn.png';
export const LOGIN_BG = OSS_IMG + 'login_bg.png';
export const CROWD_LOADER = OSS_IMG + 'crowd_loader.png'; // 默认群主头像
export const CROWD_LOGE = OSS_IMG + 'crowd_loge.png'; // 默认群头像
export const PRIVATE_CATE = OSS_IMG + 'private_cate.png'; // 非公共分类头像
export const PUBLIC_CATE = OSS_IMG + 'public_cate.png'; // 公共分类头像
export const ADMIN_AVATOR = OSS_IMG + 'admin_avator.png'; // 管理员头像

