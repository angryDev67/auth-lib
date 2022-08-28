import { BN } from "bn.js";

export async function pbkdf2(password, iterations=1e6) {
    const pwUtf8 = new TextEncoder().encode(password);                                           // encode pw as UTF-8
    const pwKey = await crypto.subtle.importKey('raw', pwUtf8, 'PBKDF2', false, ['deriveBits']); // create pw key

    const saltUint8 = crypto.getRandomValues(new Uint8Array(16));                                // get random salt

    const params = { name: 'PBKDF2', hash: 'SHA-256', salt: saltUint8, iterations: iterations }; // pbkdf2 params
    const keyBuffer = await crypto.subtle.deriveBits(params, pwKey, 256);                        // derive key

    const keyArray = Array.from(new Uint8Array(keyBuffer));                                      // key as byte array

    const saltArray = Array.from(new Uint8Array(saltUint8));                                     // salt as byte array

    const iterHex = ('000000'+iterations.toString(16)).slice(-6);                                // iter’n count as hex
    const iterArray = iterHex.match(/.{2}/g).map(byte => parseInt(byte, 16));                    // iter’ns as byte array

    const compositeArray = [].concat(saltArray, iterArray, keyArray);                            // combined array
    const compositeStr = compositeArray.map(byte => String.fromCharCode(byte)).join('');         // combined as string
    const compositeBase64 = btoa('v01'+compositeStr);                                            // encode as base64

    return compositeBase64;                                                                      // return composite key
}

export function hex2bin(hex) {
  var length = hex.length / 2;
  var result = new Uint8Array(length);
  for (var i = 0; i < length; ++i) {
    result[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return result;
}

export async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export function buf2hex(buffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}

export function toHexString(bytes) {
    console.log('bytes:', bytes)
    return bytes
      .map(function (byte) {
        let propByte = typeof byte === 'bigint' ? byte : BN(byte)
        // @ts-ignore
        //return (byte & 255n).toString(16)
        return (propByte & 255n).toString(16).padStart(2, '0')
      })
      .join('')
  }

	export function getRandomBytes() { // Browsers
        var crypto = (window.crypto || window.msCrypto), QUOTA = 65536;
        return function(n) {
          var a = new Uint8Array(n);
          for (var i = 0; i < n; i += QUOTA) {
            crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
          }
          return a;
        };
      }