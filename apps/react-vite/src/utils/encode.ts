export function toBinaryStr(str: string) {
  const encoder = new TextEncoder()
  // 1: split the UTF-16 string into an array of bytes
  const charCodes = encoder.encode(str)
  // 2: concatenate byte data to create a binary string
  return String.fromCharCode(...charCodes)
}
