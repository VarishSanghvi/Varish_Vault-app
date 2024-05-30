package com.example.filemanage.controller;

import com.example.filemanage.dto.FileDTO;
import com.example.filemanage.model.FileEntity;
import com.example.filemanage.model.User;
import com.example.filemanage.service.FileService;
import com.example.filemanage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Received file for upload: {}", file.getOriginalFilename());
        try {
            User user = userService.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
            FileEntity fileEntity = fileService.storeFile(file, user);
            logger.info("File stored successfully with ID: {}", fileEntity.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("id", fileEntity.getId());
            response.put("filename", fileEntity.getFilename());
            response.put("contentType", fileEntity.getContentType());

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error storing file: {}", file.getOriginalFilename(), e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Received request to retrieve file with ID: {}", id);
        try {
            User user = userService.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return fileService.getFile(id, user)
                    .map(fileEntity -> {
                        logger.info("File retrieved successfully with ID: {}", id);
                        return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getFilename() + "\"")
                            .body(fileEntity.getData());
                    })
                    .orElseGet(() -> {
                        logger.warn("No file found with ID: {}", id);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            logger.error("Error retrieving file with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<FileDTO>> getUserFiles(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userService.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            List<FileDTO> files = fileService.getFilesByUserDTO(user);
            return new ResponseEntity<>(files, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving user files", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
        
        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteFile(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
            logger.info("Received request to delete file with ID: {}", id);
            try {
                User user = userService.findByUsername(userDetails.getUsername())
                        .orElseThrow(() -> new RuntimeException("User not found"));
                fileService.deleteFile(id, user);
                return ResponseEntity.ok().build();
            } catch (IllegalArgumentException e) {
                logger.error("Authorization failure or file not found", e);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (Exception e) {
                logger.error("Error deleting file with ID: {}", id, e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
    }
}