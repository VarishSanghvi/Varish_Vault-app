package com.example.filemanage.service;

import com.example.filemanage.dto.FileDTO;
import com.example.filemanage.model.FileEntity;
import com.example.filemanage.model.User;
import com.example.filemanage.repository.FileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import javax.crypto.SecretKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FileService {

    private static final Logger logger = LoggerFactory.getLogger(FileService.class);

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private EncryptionService encryptionService;

    public FileEntity storeFile(MultipartFile file, User user) throws IOException {
        logger.info("Received request to store file: {}", file.getOriginalFilename());
        try {
            FileEntity fileEntity = new FileEntity();
            fileEntity.setFilename(file.getOriginalFilename());
            fileEntity.setContentType(file.getContentType());
            fileEntity.setUser(user); // Associate the file with the user
            logger.debug("File metadata set with filename: {}, content type: {}", file.getOriginalFilename(), file.getContentType());

            SecretKey key = encryptionService.generateKey();
            logger.debug("Encryption key generated");

            byte[] encryptedData = encryptionService.encrypt(file.getBytes(), key);
            byte[] encryptedKey = encryptionService.encryptKey(key);
            logger.debug("File data and key encrypted");

            fileEntity.setData(encryptedData);
            fileEntity.setEncryptionKey(encryptedKey);

            FileEntity savedFileEntity = fileRepository.save(fileEntity);
            logger.info("File stored successfully with ID: {}", savedFileEntity.getId());
            return savedFileEntity;
        } catch (Exception e) {
            logger.error("Failed to store file: {}", file.getOriginalFilename(), e);
            throw new IOException("Could not store file", e);
        }
    }

    public Optional<FileEntity> getFile(Long id, User user) {
        logger.info("Received request to retrieve file with ID: {}", id);
        return fileRepository.findById(id).filter(file -> file.getUser().equals(user)).map(file -> {
            try {
                logger.debug("File found with ID: {}", id);
                SecretKey key = encryptionService.decryptKey(file.getEncryptionKey());
                logger.debug("Encryption key decrypted");

                byte[] decryptedData = encryptionService.decrypt(file.getData(), key);
                file.setData(decryptedData);
                logger.info("File data decrypted successfully");

                return file;
            } catch (Exception e) {
                logger.error("Failed to decrypt file with ID: {}", id, e);
                return null;
            }
        });
    }

    @Transactional(readOnly = true)
    public List<FileEntity> getFilesByUser(User user) {
        logger.info("Received request to retrieve files for user: {}", user.getUsername());
        try {
            List<FileEntity> files = fileRepository.findByUser(user);
            logger.info("Files retrieved for user {}: {}", user.getUsername(), files); // Added this detailed log
            return files;
        } catch (Exception e) {
            logger.error("Failed to retrieve files for user: {}", user.getUsername(), e);
            throw new RuntimeException("Could not retrieve files for user", e);
        }
    }

    @Transactional(readOnly = true)
    public List<FileDTO> getFilesByUserDTO(User user) {
        logger.info("Received request to retrieve files for user: {}", user.getUsername());
        try {
            List<FileEntity> files = fileRepository.findByUser(user);
            logger.info("Files retrieved for user {}: {}", user.getUsername(), files); // Added this detailed log
            return files.stream()
                        .map(file -> new FileDTO(file.getId(), file.getFilename(), file.getContentType()))
                        .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Failed to retrieve files for user: {}", user.getUsername(), e);
            throw new RuntimeException("Could not retrieve files for user", e);
        }
    }
        @Transactional
        public void deleteFile(Long id, User user) throws IOException {
            logger.info("Attempting to delete file with ID: {}", id);
            FileEntity file = fileRepository.findByIdAndUser(id, user).orElseThrow(() ->
                new IllegalArgumentException("File not found or access denied")
            );
            try {
                fileRepository.delete(file);
                logger.info("File deleted successfully with ID: {}", id);
            } catch (Exception e) {
                logger.error("Failed to delete file with ID: {}", id, e);
                throw new IOException("Failed to delete file", e);
            }
        
        
    }
}