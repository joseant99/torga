package com.torga.pedidos.web.rest;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
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
	    public UploadFileResponse uploadFile1(@RequestParam("file") MultipartFile file) throws MessagingException {
	        String fileName = fileStorageService.storeFile(file);

	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/downloadFile/")
	                .path(fileName)
	                .toUriString();
	        
	        String correo = "jose45335@gmail.com";
	        String mail = "prueba";
	        SimpleMailMessage msg = new SimpleMailMessage();
	        msg.setTo(correo);

	        msg.setSubject("Error en gestion de tienda");
	        msg.setText(mail);
	        
	        Properties props = new Properties();
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.setProperty("mail.smtp.starttls.enable", "true");
            props.setProperty("mail.smtp.port", "587");
            props.setProperty("mail.smtp.user", "elmuebledigitalprueba@gmail.com");
            props.setProperty("mail.smtp.auth", "true");

            Session session = Session.getDefaultInstance(props, null);
            // session.setDebug(true);

            // Se compone la parte del texto
            BodyPart texto = new MimeBodyPart();
            texto.setText("Texto del mensaje");

            // Se compone el adjunto con la imagen
            BodyPart adjunto = new MimeBodyPart();
            adjunto.setDataHandler(
                new DataHandler(new FileDataSource("src/main/webapp/content/images/imagenesSubidas/pruebapdf.pdf")));
            adjunto.setFileName("src/main/webapp/content/images/imagenesSubidas/pruebapdf.pdf");

            // Una MultiParte para agrupar texto e imagen.
            MimeMultipart multiParte = new MimeMultipart();
            multiParte.addBodyPart(texto);
            multiParte.addBodyPart(adjunto);

            // Se compone el correo, dando to, from, subject y el
            // contenido.
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("jose45335@gmail.com"));
            message.addRecipient(
                Message.RecipientType.TO,
                new InternetAddress("elmuebledigitalprueba@gmail.com"));
            message.setSubject("Prueba");
            message.setContent(multiParte);

            // Se envia el correo.
            Transport t = session.getTransport("smtp");
            t.connect("elmuebledigitalprueba@gmail.com", "elMuebleDigital2019");
            t.sendMessage(message, message.getAllRecipients());
            t.close();

	        javaMailSender.send(msg);
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
