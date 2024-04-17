var Dictionary;
(function (Dictionary) {
    Dictionary["permanent"] = "permanent";
    Dictionary["expire"] = "_expire_";
})(Dictionary || (Dictionary = {}));

class Storage {
    constructor() {
    }
    set(key, value, expire = Dictionary.permanent) {
        const data = {
            value,
            [Dictionary.expire]: expire,
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
    get(key) {
        const value = localStorage.getItem(key);
        if (!value) {
            return {
                message: "值无效",
                value: null
            };
        }
        else { //有storage
            const data = JSON.parse(value);
            const now = new Date().getTime();
            if (typeof data[Dictionary.expire] == 'number' && data[Dictionary.expire] < now) { //过期了
                this.remove(key);
                return {
                    message: `您的${key}已过期`,
                    value: null
                };
            }
            else { //没过期
                return {
                    message: "成功",
                    value: data.value
                };
            }
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}

export { Storage };
