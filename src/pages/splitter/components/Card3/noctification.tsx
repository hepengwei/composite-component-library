// @ts-nocheck
import Notification from "rc-notification";

class TRNotificationSinge {
  notification = null;
  keyMap = new Map();
  constructor() {
    this.keys = [];
    Notification.newInstance({}, (n) => (this.notification = n));
  }

  /**
   * 添加方法
   * @param key  唯一值
   * @param content
   * @param duration
   * @param {function} dismiss 销毁方法
   */
  add({ key, content, duration = null, dismiss }) {
    this.keyMap.set(key, dismiss);
    this.notification.notice({
      key,
      content,
      duration,
    });
  }
  remove(key) {
    this.notification.removeNotice(key);
    this.keyMap.delete(key);
  }

  clear() {
    this.keyMap.forEach((fuc, key) => {
      fuc ? fuc() : this.remove(key);
    });
    this.keyMap.clear();
  }
}

TRNotificationSinge.getInstance = (function () {
  let instance;
  return function () {
    instance = instance ? instance : new TRNotificationSinge();
    return instance;
  };
})();

const TRNotification = TRNotificationSinge.getInstance();

export default TRNotification;
