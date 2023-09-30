import CryptoJS from 'crypto-js'

export default function useEncriptacion(){
    const secretKey = process.env.REACT_APP_KEY

    const encrypt = async (plainText) => 
    {
        const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString()
        return cipherText
    }

    const decrypt = async (cipherText) => 
    {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey )
        const plainText = bytes.toString(CryptoJS.enc.Utf8)
        return plainText
    }

    return {encrypt, decrypt}
}