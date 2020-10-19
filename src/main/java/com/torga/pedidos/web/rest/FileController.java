package com.torga.pedidos.web.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpServletRequest;
import com.torga.pedidos.service.FileStorageService;
import com.torga.pedidos.web.rest.util.UploadFileResponse;

import io.github.jhipster.config.JHipsterProperties;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.source.OutputStream;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.pdfcrowd.Pdfcrowd;


/**
 * REST controller for managing Files.
 */
@RestController
@RequestMapping("/api")
public class FileController {

	 private static final Logger logger = LoggerFactory.getLogger(FileController.class);
	 	private final JHipsterProperties jHipsterProperties;

	    private final JavaMailSender javaMailSender;

	    private final MessageSource messageSource;

	    private final SpringTemplateEngine templateEngine;
	    
	    public FileController(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender,
	            MessageSource messageSource, SpringTemplateEngine templateEngine) {

	        this.jHipsterProperties = jHipsterProperties;
	        this.javaMailSender = javaMailSender;
	        this.messageSource = messageSource;
	        this.templateEngine = templateEngine;
	    }
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
	    
	    @PostMapping("/uploadFile1")
	    public ResponseEntity<byte[]> uploadFile1(@RequestParam("file") MultipartFile file ,@RequestParam("correo") String correo) throws MessagingException, FileNotFoundException, IOException {
	    	String fileName = fileStorageService.storeFile(file);
	        
	        // IO
	         // pdfHTML specific code
	        	//HtmlConverter.convertToPdf(
	              //  "<img id=\"imagenPresupues\" style=\"z-index:100;max-width:400px;max-height:400px;;max-width:410px;max-height:410px;\" width=\"1000px\" height=\"1000px\" src=\"C:/Users/jose/Desktop/prueba/torgaPedidos2Bueno/src/main/webapp/content/images/1- PARA WEB/DORMITORIO2/NH033-NH036.jpeg\">",       // html to be converted
	                //new PdfWriter(
	                  //  new File("C:\\Users\\jose\\output.pdf")  // destination file
	               // )
	            //);
	    	Pdfcrowd.HtmlToPdfClient client =
	                new Pdfcrowd.HtmlToPdfClient("demo", "ce544b6ea52a5621fb9d55f8b542d14d");
	    	FileOutputStream fileStream;
	            // run the conversion and store the result into the "pdf" variable
	            byte[] pdf = client.convertString("<html>\n" +
	                "  <body>\n" +
	                "    Hello World!\n" +
	                "  </body>\n" +
	                "</html>");

	            // set HTTP response headers
	            HttpHeaders headers = new HttpHeaders();
	            headers.add("Content-Type", "application/pdf");
	            headers.add("Cache-Control", "max-age=0");
	            headers.add("Accept-Ranges", "none");
	            headers.add("Content-Disposition", "attachment; filename=\"result.pdf\"");
	            fileStream = new FileOutputStream("result.pdf");
	            fileStream.close(); 
	            System.out.println(fileStream);
	            System.out.println(pdf);
	            // send the result in the HTTP response
	            return new ResponseEntity<>(pdf, headers, HttpStatus.OK);

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
