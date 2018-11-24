/**
 * websocket地址
 */
export const URL_WEBSOCKET = process.env.NODE_ENV === 'production' ? `wss://${location.hostname}/wss/` : `ws://116.62.29.171:7272`;