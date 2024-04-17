
import { Dictionary } from '../enum'
export interface StorageClass {
    get: <T> (key: Key) => void;
    set: <T>(key: Key, value: T, expire: Expire) => void;
    remove: (key: Key) => void;
    clear: () => void;
}
export interface Data<T> {
    value: T
    [Dictionary.expire]: Expire
}
export interface Result<T> {
    message: string,
    value: T | null
}

export type Key = string
export type Expire = Dictionary.permanent | number;