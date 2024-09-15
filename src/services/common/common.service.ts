import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as crypto from 'crypto-js';
import { forEach } from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  private secretKey: string = 'my-secret-key';
  constructor() { }

  public clearStorage(key: string) {
    localStorage.removeItem(key);
  }

  public clearStorageByKeys(keys: string[]) {
    forEach(keys, this.clearStorage);
  }

  public clearStorageAll() {
    localStorage.clear();
  }

  /**
   * Function to get decrypted access-token from localstorage
   */
  getAccessToken(key: any): any {
    return this.getItem(key)?.access_token
  }

  /**
   * Function to set encrypted access-token in localstorage
   * @param val string or object
   */
  setUserData(key: any, value: any) {
    this.setEncryptedItem(key, value)
  }

  /**
   * Remove specific key from localStorage
   * @param key string
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Function to decrypt value
   * @param val string
   * @param secretKey string
   */
  getDecryptedVal(val: string, secretKey: string) {
    let decryptObj = crypto.AES.decrypt(val, this.secretKey);
    return _.attempt(_.invoke, decryptObj, 'toString', crypto.enc.Utf8);
  }

  /**
   * Function to get decrypted item from localstorage
   * @param key string
   */
  getItem(key: string) {
    let retrievedVal = localStorage.getItem(key);
    if (_.isNull(retrievedVal)) {
      return null;
    }

    let decryptedVal: any = this.getDecryptedVal(retrievedVal, this.secretKey);
    // value modified by user
    if (_.isError(decryptedVal) || _.isEmpty(decryptedVal)) {
      this.removeItem(key);
      return null;
    }
    let decryptedObj = _.attempt(JSON.parse.bind(null, decryptedVal));
    return _.isError(decryptedObj) ? decryptedVal : decryptedObj;
  }

  /**
   * Function to set encrypted value in localstorage
   * @param key string
   * @param val string or object
   */
  setEncryptedItem(key: string, val: any) {
    let parsedVal: any;
    // Check whether value is an object
    if (_.isObject(val) || _.isArray(val)) {
      parsedVal = _.attempt(JSON.stringify.bind(null, val));
    }
    // If value is string
    else if (_.isString(val)) {
      parsedVal = val;
    }
    // Encrypt key and store in localStorage
    if (!_.isError(parsedVal) && !_.isUndefined(parsedVal)) {
      parsedVal = crypto.AES.encrypt(parsedVal, this.secretKey)
      localStorage.setItem(key, parsedVal);
    }
  }

  /**
   * Function to clear LocalStorage
   */
  clearLocalStorage() {
    localStorage.clear();
  }


}
