package com.example.filemanage.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class EncryptionService {

    @Value("${master.encryption.key}")
    private String masterKeyBase64;  

    private static final String ALGORITHM = "AES";

    public SecretKey generateKey() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance(ALGORITHM);
        keyGenerator.init(256); 
        return keyGenerator.generateKey();
    }

    public byte[] encrypt(byte[] data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(data);
    }

    public byte[] decrypt(byte[] data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);
        return cipher.doFinal(data);
    }

    // Encrypt the AES key with a master key
    public byte[] encryptKey(SecretKey key) throws Exception {
        byte[] keyBytes = key.getEncoded();
        byte[] decodedMasterKey = Base64.getDecoder().decode(masterKeyBase64);
        SecretKeySpec masterKeySpec = new SecretKeySpec(decodedMasterKey, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, masterKeySpec);
        return cipher.doFinal(keyBytes);
    }

    // Decrypt the AES key with the master key
    public SecretKey decryptKey(byte[] encryptedKey) throws Exception {
        byte[] decodedMasterKey = Base64.getDecoder().decode(masterKeyBase64);
        SecretKeySpec masterKeySpec = new SecretKeySpec(decodedMasterKey, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, masterKeySpec);
        byte[] decodedKey = cipher.doFinal(encryptedKey);
        return new SecretKeySpec(decodedKey, ALGORITHM);
    }
}
