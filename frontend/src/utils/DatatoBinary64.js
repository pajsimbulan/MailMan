//Converts a data array to a base64 string
export function intArrayToBase64String(dataArray) {
    const uint16Array = new Uint16Array(dataArray);
    const textDecoder = new TextDecoder('utf-16le');
    return textDecoder.decode(uint16Array);
  }

//Converts a buffer to a base64 string
export const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      '',
    );
    return btoa(binary);
  };