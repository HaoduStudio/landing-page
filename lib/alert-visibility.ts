const ALERT_STORAGE_PREFIX = "alert_dismissed_";
const DISMISSAL_DURATION_DAYS = 7;

/**
 * 检查 Alert 是否应该显示
 * @param alertId - Alert 的唯一标识符
 * @returns boolean - true 表示应该显示，false 表示应该隐藏
 */
export function shouldShowAlert(alertId: string): boolean {
  if (typeof window === "undefined") {
    return true; // SSR 时默认显示
  }

  try {
    const storageKey = `${ALERT_STORAGE_PREFIX}${alertId}`;
    const dismissalData = localStorage.getItem(storageKey);

    if (!dismissalData) {
      return true; // 未关闭过，应该显示
    }

    try {
      const { dismissedAt } = JSON.parse(dismissalData);
      const dismissedDate = new Date(dismissedAt);
      const now = new Date();
      const diffDays =
        (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays >= DISMISSAL_DURATION_DAYS) {
        // 超过 7 天，清除记录并显示
        localStorage.removeItem(storageKey);
        return true;
      }

      return false; // 在 7 天内，不显示
    } catch {
      localStorage.removeItem(storageKey);
      return true;
    }
  } catch {
    return true;
  }
}

/**
 * 标记 Alert 为已关闭
 * @param alertId - Alert 的唯一标识符
 */
export function dismissAlert(alertId: string): void {
  if (typeof window === "undefined") {
    return; // SSR 时不处理
  }

  try {
    const storageKey = `${ALERT_STORAGE_PREFIX}${alertId}`;
    const dismissalData = {
      dismissedAt: new Date().toISOString(),
      alertId,
    };
    localStorage.setItem(storageKey, JSON.stringify(dismissalData));
  } catch {
  }
}

/**
 * 清除 Alert 的关闭记录
 * @param alertId - Alert 的唯一标识符
 */
export function clearAlertDismissal(alertId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const storageKey = `${ALERT_STORAGE_PREFIX}${alertId}`;
    localStorage.removeItem(storageKey);
  } catch {
  }
}
