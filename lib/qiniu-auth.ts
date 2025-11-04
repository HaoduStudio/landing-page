/**
 * 七牛云CDN时间戳鉴权工具
 * 文档: https://developer.qiniu.com/fusion/kb/1670/timestamp-hotlinking-prevention
 */

import crypto from 'crypto';

/**
 * URL编码（斜线不编码）
 * @param str 待编码的字符串
 * @returns 编码后的字符串
 */
function urlEncode(str: string): string {
  return encodeURIComponent(str).replace(/%2F/g, '/');
}

/**
 * 将时间戳转换为16进制小写形式
 * @param timestamp Unix时间戳（秒）
 * @returns 16进制字符串
 */
function toHex(timestamp: number): string {
  return timestamp.toString(16).toLowerCase();
}

/**
 * 计算MD5签名
 * @param str 待签名的字符串
 * @returns MD5哈希值（小写）
 */
function md5(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex').toLowerCase();
}

/**
 * 生成带时间戳签名的七牛云CDN URL
 * @param originalUrl 原始URL
 * @param key 七牛云CDN配置的密钥
 * @param expiresIn 有效期（秒），默认3600秒（1小时）
 * @returns 带签名的完整URL
 */
export function generateQiniuSignedUrl(
  originalUrl: string,
  key: string,
  expiresIn: number = 3600
): string {
  try {
    // 解析URL
    const url = new URL(originalUrl);
    const path = url.pathname;
    
    // 计算过期时间（Unix时间戳）
    const deadline = Math.floor(Date.now() / 1000) + expiresIn;
    const t = toHex(deadline);
    
    // 构建签名原始字符串: S = key + url_encode(path) + T
    const signString = key + urlEncode(path) + t;
    
    // 计算签名: SIGN = md5(S).to_lower()
    const sign = md5(signString);
    
    // 构建最终URL
    // 保留原有的查询参数，添加sign和t参数
    const finalUrl = new URL(originalUrl);
    finalUrl.searchParams.append('sign', sign);
    finalUrl.searchParams.append('t', t);
    
    return finalUrl.toString();
  } catch (error) {
    console.error('Failed to generate Qiniu signed URL:', error);
    throw error;
  }
}

/**
 * 为下载链接生成签名URL（服务端使用）
 * @param endpoint CDN域名
 * @param fileName 文件名
 * @param key 七牛云密钥
 * @param expiresIn 有效期（秒）
 * @returns 带签名的完整下载URL
 */
export function generateDownloadUrl(
  endpoint: string,
  fileName: string,
  key: string,
  expiresIn: number = 3600
): string {
  // 确保endpoint以/结尾
  const baseUrl = endpoint.endsWith('/') ? endpoint : endpoint + '/';
  const originalUrl = baseUrl + fileName;
  
  return generateQiniuSignedUrl(originalUrl, key, expiresIn);
}
