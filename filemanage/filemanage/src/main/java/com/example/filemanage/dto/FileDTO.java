package com.example.filemanage.dto;

public class FileDTO {
    private Long id;
    private String filename;
    private String contentType;


    public FileDTO() {
    }

    public FileDTO(Long id, String filename, String contentType) {
        this.id = id;
        this.filename = filename;
        this.contentType = contentType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
