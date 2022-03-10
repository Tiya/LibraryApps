function convertBufferToBase64(buffer) {
    let binaryStr = '';
    const byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.byteLength; i++) {
      binaryStr += String.fromCharCode(bytes[i]);
    }
    console.log(binary);
    return btoa(binary);
  }