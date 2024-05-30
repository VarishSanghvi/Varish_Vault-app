package com.example.filemanage.repository;

import com.example.filemanage.model.FileEntity;
import com.example.filemanage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByUser(User user);
    Optional<FileEntity> findByIdAndUser(Long id, User user);
}