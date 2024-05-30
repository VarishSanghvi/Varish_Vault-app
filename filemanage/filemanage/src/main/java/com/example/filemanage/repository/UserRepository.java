package com.example.filemanage.repository;

import com.example.filemanage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;  // Import added

import java.util.Optional;

@Repository  
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
