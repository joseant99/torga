package com.torga.pedidos.web.rest;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.servlet.http.HttpServletRequest;
import com.torga.pedidos.service.FileStorageService;
import com.torga.pedidos.web.rest.util.UploadFileResponse;

/**
 * REST controller for managing Files.
 */
@RestController
@RequestMapping("/api")
public class FileController {
	
	 private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	    @Autowired
	    private FileStorageService fileStorageService;
	    
	    @PostMapping("/subirFactura")
	    public UploadFileResponse uploadFactura(@RequestParam("file") MultipartFile file) {
	        String fileName = fileStorageService.storeFileFacturas(file);

	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/downloadFile/")
	                .path(fileName)
	                .toUriString();

	        return new UploadFileResponse(fileName, fileDownloadUri,
	                file.getContentType(), file.getSize());
	    }
	    
	    @PostMapping("/subirConfirmacion")
	    public UploadFileResponse uploadConfirmacion(@RequestParam("file") MultipartFile file) {
	        String fileName = fileStorageService.storeFileConfirmacion(file);

	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/downloadFile/")
	                .path(fileName)
	                .toUriString();

	        return new UploadFileResponse(fileName, fileDownloadUri,
	                file.getContentType(), file.getSize());
	    }
	    
	    
	    @PostMapping("/insertClientesCSV")
	    public ResponseEntity<Boolean> uploadClientes(@RequestParam("namefile") String namefile) {
	      	        
	        boolean result = fileStorageService.CSVClientestoDatabase(namefile);

	        return ResponseEntity.ok()
	                .body(result);
	    }
	    
	    @PostMapping("/insertRepresentantesCSV")
	    public ResponseEntity<String> uploadRepresentantes(@RequestParam("namefile") String namefile) {
	      	        
	        String result = fileStorageService.representanteToDatabase(namefile);

	        return ResponseEntity.ok()
	                .body(result);
	    }
	    
	    @PostMapping("/insertPedidosCSV")
	    public ResponseEntity<String> uploadPedidos(@RequestParam("namefile") String namefile) {
	      	        
	        String result = fileStorageService.CSVtoDatabase(namefile);

	        return ResponseEntity.ok()
	                .body(result);
	    }
	   
	    
	    @PostMapping("/uploadFile")
	    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
	        String fileName = fileStorageService.storeFile(file);

	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/downloadFile/")
	                .path(fileName)
	                .toUriString();
	        
	        

	        return new UploadFileResponse(fileName, fileDownloadUri,
	                file.getContentType(), file.getSize());
	    }

	    @PostMapping("/uploadMultipleFiles")
	    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
	        return Arrays.asList(files)
	                .stream()
	                .map(file -> uploadFile(file))
	                .collect(Collectors.toList());
	    }
	    
	    @GetMapping("/existeConfirmacion/{fileName:.+}")
	    public ResponseEntity<Boolean> existeConfirmacion(@PathVariable String fileName, HttpServletRequest request) {
	        // Load file as Resource
	        boolean resource = fileStorageService.existeConfirmacion(fileName);

	       return ResponseEntity.ok()
	             .body(resource);
	    }
	    @GetMapping("/existeFactura/{fileName:.+}")
	    public ResponseEntity<Boolean> existeFactura(@PathVariable String fileName, HttpServletRequest request) {
	        // Load file as Resource
	        boolean resource = fileStorageService.existeFactura(fileName);

	       return ResponseEntity.ok()
	             .body(resource);
	    }
	    
	    @GetMapping("/descargarFactura/{fileName:.+}")
	    public ResponseEntity<Resource> downloadFactura(@PathVariable String fileName, HttpServletRequest request) {
	        // Load file as Resource
	        Resource resource = fileStorageService.downloadFacturaAsResource(fileName);

	        // Try to determine file's content type
	        String contentType = null;
	        try {
	            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
	        } catch (IOException ex) {
	            logger.info("Could not determine file type.");
	        }

	        // Fallback to the default content type if type could not be determined
	        if(contentType == null) {
	            contentType = "application/octet-stream";
	        }

	        return ResponseEntity.ok()
	                .contentType(MediaType.parseMediaType(contentType))
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
	                .body(resource);
	    }
	    
	    @GetMapping("/descargarConfirmacion/{fileName:.+}")
	    public ResponseEntity<Resource> downloadConfirmacion(@PathVariable String fileName, HttpServletRequest request) {
	        // Load file as Resource
	        Resource resource = fileStorageService.downloadConfirmacionAsResource(fileName);

	        // Try to determine file's content type
	        String contentType = null;
	        try {
	            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
	        } catch (IOException ex) {
	            logger.info("Could not determine file type.");
	        }

	        // Fallback to the default content type if type could not be determined
	        if(contentType == null) {
	            contentType = "application/octet-stream";
	        }

	        return ResponseEntity.ok()
	                .contentType(MediaType.parseMediaType(contentType))
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
	                .body(resource);
	    }

	    @GetMapping("/downloadFile/{fileName:.+}")
	    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
	        // Load file as Resource
	        Resource resource = fileStorageService.loadFileAsResource(fileName);

	        // Try to determine file's content type
	        String contentType = null;
	        try {
	            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
	        } catch (IOException ex) {
	            logger.info("Could not determine file type.");
	        }

	        // Fallback to the default content type if type could not be determined
	        if(contentType == null) {
	            contentType = "application/octet-stream";
	        }

	        return ResponseEntity.ok()
	                .contentType(MediaType.parseMediaType(contentType))
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
	                .body(resource);
	    }

}
