import { StorageClass, Key, Expire, Data ,Result} from './type'
import { Dictionary } from './enum'
export class Storage implements StorageClass {
    constructor() {

    }
    set<T>(key: Key, value: T,  expire:Expire = Dictionary.permanent) {
        const data = {
            value,
            [Dictionary.expire]: expire,
        }
        localStorage.setItem(key, JSON.stringify(data))
    }
    get<T>(key: Key):Result<T|null> {
        const value = localStorage.getItem(key)
        if (!value) {
            return {
                message: "值无效",
                value: null
            }
        } else { //有storage
            const data: Data<T> = JSON.parse(value);
            const now = new Date().getTime();
            if (typeof data[Dictionary.expire] == 'number' && data[Dictionary.expire] < now) { //过期了
                this.remove(key)
                return {
                    message: `您的${key}已过期`,
                    value: null
                }
            }else{//没过期
                return{
                    message:"成功",
                    value:data.value
                }
            }
        }
    }
    remove(key: Key) {
        localStorage.removeItem(key)
    }
    clear() {
        localStorage.clear()
    }
}