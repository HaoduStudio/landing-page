interface DownloadConfig {
  version: string;
  date: string;
  download: {
    allow: boolean;
    global: boolean;
    endpoint: string;
    file_name: string;
    file_sha256: string;
  };
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const CACHE_KEY = "download_config_cache";
const CACHE_DURATION = 15 * 60 * 1000; // 15分钟

/**
 * 从localStorage获取缓存的配置
 */
export function getCachedConfig(): DownloadConfig | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    
    if (!cached) {
      console.log("[DownloadCache] 没有找到缓存");
      return null;
    }

    const cacheEntry: CacheEntry<DownloadConfig> = JSON.parse(cached);
    const now = Date.now();

    // 检查缓存是否过期
    if (now > cacheEntry.expiresAt) {
      console.log(
        `[DownloadCache] 缓存已过期（缓存于 ${new Date(cacheEntry.timestamp).toLocaleString()}），清空缓存`
      );
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    const remainingTime = Math.floor((cacheEntry.expiresAt - now) / 1000);
    console.log(
      `[DownloadCache] 从缓存返回配置（缓存于 ${new Date(cacheEntry.timestamp).toLocaleString()}，剩余有效期：${remainingTime}秒）`
    );
    
    return cacheEntry.data;
  } catch (error) {
    console.error("[DownloadCache] 读取缓存失败:", error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

/**
 * 将配置保存到localStorage缓存
 */
export function cacheConfig(config: DownloadConfig): void {
  try {
    const now = Date.now();
    const cacheEntry: CacheEntry<DownloadConfig> = {
      data: config,
      timestamp: now,
      expiresAt: now + CACHE_DURATION,
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
    console.log(
      `[DownloadCache] 配置已缓存（版本：${config.version}，有效期：15分钟，过期时间：${new Date(cacheEntry.expiresAt).toLocaleString()}）`
    );
  } catch (error) {
    console.error("[DownloadCache] 缓存配置失败:", error);
  }
}

/**
 * 清空缓存
 */
export function clearCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log("[DownloadCache] 缓存已清空");
  } catch (error) {
    console.error("[DownloadCache] 清空缓存失败:", error);
  }
}

/**
 * 获取缓存统计信息（用于调试）
 */
export function getCacheStats(): {
  hasCached: boolean;
  cachedAt?: string;
  expiresAt?: string;
  remainingSeconds?: number;
} {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    
    if (!cached) {
      return { hasCached: false };
    }

    const cacheEntry: CacheEntry<DownloadConfig> = JSON.parse(cached);
    const now = Date.now();
    const isExpired = now > cacheEntry.expiresAt;

    return {
      hasCached: !isExpired,
      cachedAt: new Date(cacheEntry.timestamp).toLocaleString(),
      expiresAt: new Date(cacheEntry.expiresAt).toLocaleString(),
      remainingSeconds: isExpired ? 0 : Math.floor((cacheEntry.expiresAt - now) / 1000),
    };
  } catch (error) {
    console.error("[DownloadCache] 获取缓存统计信息失败:", error);
    return { hasCached: false };
  }
}
