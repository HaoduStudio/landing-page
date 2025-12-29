/**
 * 获取下载配置API
 * 用于在服务端获取带时间戳签名的七牛云CDN配置文件
 */

import { NextResponse } from 'next/server';
import { generateQiniuSignedUrl } from '../../../lib/qiniu-auth';

const CONFIG_URL = 'https://cdn.lightxi.com/cloudreve/uploads/2025/11/04/Bp1TtPUi_download.json';

export async function GET() {
  try {
    // 从环境变量获取密钥
    const cdnKey = process.env.QINIU_CDN_KEY;
    
    if (!cdnKey) {
      console.error('QINIU_CDN_KEY is not configured in environment variables');
      return NextResponse.json(
        { error: 'CDN authentication not configured' },
        { status: 500 }
      );
    }
    
    // 生成带签名的配置文件URL（5分钟有效期）
    const signedUrl = generateQiniuSignedUrl(CONFIG_URL, cdnKey, 300);
    
    if (process.env.NODE_ENV === 'development') {
      try {
        // eslint-disable-next-line no-console
        console.log('[dev] fetch download.json with signed URL:', signedUrl);
      } catch (e) {
        // ignore logging failures
      }
    }
    
    // 从七牛云CDN获取配置文件
    const response = await fetch(signedUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.status}`);
    }
    
    const config = await response.json();
    
    // 返回配置数据
    return NextResponse.json(config);
    
  } catch (error) {
    console.error('Failed to fetch download config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch download configuration' },
      { status: 500 }
    );
  }
}
