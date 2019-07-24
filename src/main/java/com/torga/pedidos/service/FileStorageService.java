package com.torga.pedidos.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

import org.joda.time.format.DateTimeFormat;
import org.simpleflatmapper.csv.CsvParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.torga.pedidos.config.FileStorageProperties;
import com.torga.pedidos.domain.Cliente;
import com.torga.pedidos.domain.Estados;
import com.torga.pedidos.domain.Logistica;
import com.torga.pedidos.domain.Pedidos;
import com.torga.pedidos.domain.ReferenciaClientes;
import com.torga.pedidos.domain.Representante;
import com.torga.pedidos.domain.Transportistas;
import com.torga.pedidos.web.rest.errors.FileStorageException;
import com.torga.pedidos.web.rest.errors.MyFileNotFoundException;
import static java.nio.charset.StandardCharsets.*;

/**
 * Service Implementation for managing Files.
 */
@Service
public class FileStorageService {

	private final Path fileStorageLocation;

	private final Path facturasStorageLocation;

	private final Path confirmacionStorageLocation;

	private final ClienteService clienteService;

	private final ReferenciaClientesService referenciaClientesService;

	private final LogisticaService logisticaService;

	private final RepresentanteService representanteService;

	private final PedidosService pedidosService;
	
	private final EstadosService estadosService;
	
	private final TransportistasService transportistaService;

	@Autowired
	public FileStorageService(FileStorageProperties fileStorageProperties, ClienteService clienteService,
			ReferenciaClientesService referenciaClientesService, LogisticaService logisticaService,
			PedidosService pedidosService, RepresentanteService representanteService,
			EstadosService estadosService, TransportistasService transportistaService) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

		this.facturasStorageLocation = Paths.get(fileStorageProperties.getFacturasDir()).toAbsolutePath().normalize();

		this.confirmacionStorageLocation = Paths.get(fileStorageProperties.getConfirmacionDir()).toAbsolutePath()
				.normalize();

		this.representanteService = representanteService;

		this.clienteService = clienteService;

		this.logisticaService = logisticaService;

		this.referenciaClientesService = referenciaClientesService;

		this.pedidosService = pedidosService;
		
		this.estadosService = estadosService;
		
		this.transportistaService = transportistaService;
		
		try {
			Files.createDirectories(this.fileStorageLocation);
			Files.createDirectories(this.facturasStorageLocation);
			Files.createDirectories(this.confirmacionStorageLocation);
		} catch (Exception ex) {
			throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
					ex);
		}
	}

	public String storeFileFacturas(MultipartFile file) {
		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.facturasStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	public String storeFileConfirmacion(MultipartFile file) {
		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.confirmacionStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	public String storeFile(MultipartFile file) {
		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	public Resource downloadFacturaAsResource(String fileName) {
		try {
			Path filePath = this.facturasStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new MyFileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName, ex);
		}
	}
	
	public boolean existeFactura(String fileName) {
		try {
			Path filePath = this.facturasStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return true;
			} else {
				return false;
			}
		} catch (MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName, ex);
		}
	}

	public boolean existeConfirmacion(String fileName) {
		try {
			Path filePath = this.confirmacionStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return true;
			} else {
				return false;
				//throw new MyFileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName, ex);
		}
	}
	
	
	public Resource downloadConfirmacionAsResource(String fileName) {
		try {
			Path filePath = this.confirmacionStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new MyFileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName, ex);
		}
	}

	public Resource loadFileAsResource(String fileName) {
		try {
			Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new MyFileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName, ex);
		}
	}

	public boolean CSVClientestoDatabase(String nameFile) {

		Path targetLocation = this.fileStorageLocation.resolve(nameFile);
		File csv = new File(targetLocation.toUri());
		try {

			CsvParser.separator(';').skip(1).mapTo(ClienteCSVEntity.class)
					.headers("cliente", "poblacion", "provincia", "representante", "codigocliente")
					.forEach(csv, clientes -> {

						Cliente cliente = new Cliente();
						cliente.setCodCliente(clientes.getCodigocliente());
						cliente.setNombre(clientes.getCliente());
						cliente.setProvincia(clientes.getProvincia());
						cliente.setPoblacion(clientes.getPoblacion());

						// BUSCAR AL REPRESENTANTE
						Representante representante = representanteService
								.getRepresentanteNombre(clientes.getRepresentante());
						cliente.setRepresentates(representante);

						clienteService.save(cliente);

						System.out.println(representante);
						System.out.println(cliente);
					});

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return true;

	}

	public String representanteToDatabase(String namefile) {
		
		System.out.println("DENTRO DE REPRESENANTE TO DATABASE");
		Path targetLocation = this.fileStorageLocation.resolve(namefile);
		File csv = new File(targetLocation.toUri());
		
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(csv), "UTF-8"));
			System.out.println("LEYENDO CSV");
			CsvParser.separator(';').skip(1).mapTo(RepresentanteCSVEntity.class).headers("representante").forEach(in,
					representantes -> {

						// BUSCAR AL REPRESENTANTE
						Representante representante = representanteService
								.getRepresentanteNombre(representantes.getRepresentante());

						if (representante != null) {

							System.out.println("El representante ya existe");

						} else {
							representante = new Representante();
							representante.setNombre(representantes.getRepresentante());
							representanteService.save(representante);
						}
					});

		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "true";

	}

	public String CSVtoDatabase(String nameFile) {

		Path targetLocation = this.fileStorageLocation.resolve(nameFile);
		File csv = new File(targetLocation.toUri());

		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(csv), "UTF-8"));
			CsvParser.separator(';').skip(1).mapTo(EntradaCSVEntity.class)
					.headers("fecha_pedido", "pedido", "confirmacion", "ruta", "carro", "referencia_cliente",
							"codigo_cliente", "cliente", "importe", "estado", "transportista", "fecha_entrega", "representante",
							"poblacion", "provincia", "factura")
					.forEach(in, pedido -> {

						Pedidos pedidoBD = pedidosService.findAllBynumPedido(pedido.getPedido());
						Logistica logisticaBD = logisticaService.findOneBynumPedido(pedido.getPedido());
						if (pedidoBD != null) {

							pedidosService.delete(pedidoBD.getId());
							logisticaService.delete(logisticaBD.getId());
							insertarPedido(pedido);

						} else {
							insertarPedido(pedido);
						}
					});

		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
			return e1.getMessage();

		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
			return e1.getMessage();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return e.getMessage();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return e.getMessage();
		}

		return "Pedidos insertados correctamente en BD";

	}

	private String insertarPedido(EntradaCSVEntity pedido) throws UnsupportedEncodingException {

		Pedidos pedidos = new Pedidos();
		Logistica logistica = new Logistica();
		Cliente client = clienteService.getClientecodCliente(new String(pedido.getCodigo_cliente().getBytes("ISO-8859-1"), UTF_8));
		
		if(client == null) {
			
			Cliente clienteBD = new Cliente();
			clienteBD.setCodCliente(pedido.getCodigo_cliente());
			System.out.println("CODIGO " + new String(pedido.getCodigo_cliente().getBytes("ISO-8859-1"), UTF_8));
			clienteBD.setNombre(pedido.getCliente());
			System.out.println("NOMBRE " + new String(pedido.getCliente().getBytes("ISO-8859-1"), UTF_8));
			clienteBD.setPoblacion(pedido.getPoblacion());
			
			clienteBD.setProvincia(pedido.getProvincia());
			
			// BUSCAR AL REPRESENTANTE
			System.out.println("REPRESENTANTE " + pedido.getRepresentante());
			Representante representante = representanteService
					.getRepresentanteNombre(pedido.getRepresentante());
			
			if(representante != null ) {
				clienteBD.setRepresentates(representante);
			}
			
			client = clienteService.save(clienteBD);
			
		}

		// CREAMOS LA PARTE DE LOGISTICA
		try {
			
			if (pedido.getCarro() != null ) {
				logistica.setCarro(pedido.getCarro());
			}

			if (pedido.getEstado() != null ) {
				
				Estados estado = estadosService.findOneByName(pedido.getEstado());
				if(estado == null) {
					estado = new Estados();
					estado.setEstadoPedido(pedido.getEstado());
					Estados estadoBD = estadosService.save(estado);
					logistica.setEstados(estadoBD);
				}else {
					logistica.setEstados(estado);
				}
				
			}
			if (pedido.getTransportista() != null) {
				
				Transportistas transportista = transportistaService.findOneByName(pedido.getTransportista());
				if(transportista == null) {
					transportista = new Transportistas();
					transportista.setTransportistaPedido(pedido.getTransportista());
					Transportistas transportistaBD = transportistaService.save(transportista);
					logistica.setTransportistas(transportistaBD);
				}else {
					logistica.setTransportistas(transportista);

				}
			}

			if (pedido.getFecha_entrega() != null) {
				DateTimeFormatter df_entrega = DateTimeFormatter.ofPattern("dd/MM/yyyy");
				logistica.setFechaEntrega(LocalDate.parse(pedido.getFecha_entrega().split(" ")[0], df_entrega));
			}
			if (pedido.getFecha_pedido() != null) {
				DateTimeFormatter df_pedido = DateTimeFormatter.ofPattern("dd/MM/yyyy");
				LocalDate fecha_entrega = LocalDate.parse(pedido.getFecha_pedido().split(" ")[0], df_pedido);
				logistica.setFechaPedido(fecha_entrega);
			}

			if (pedido.getPedido() != null) {
				logistica.setNumPedido(pedido.getPedido());
			}

			if (pedido.getRuta() != null) {
				logistica.setRuta(pedido.getRuta());
			}
			
			if (pedido.getPedido() != null) {
				logistica.setNumPedido(pedido.getPedido());
			}

			if (pedido.getReferencia_cliente() == null) {

				if (client != null) {

					ReferenciaClientes refCliente = new ReferenciaClientes();
					refCliente.setReferenciaCliente(" ");
					refCliente.setCliente(client);
					ReferenciaClientes refClienteBD = referenciaClientesService.save(refCliente);
					logistica.setReferenciaclientes(refClienteBD);
					pedidos.setReferenciaclientes(refClienteBD);

				} else {
					System.out.println("NO EXISTE EL CODIGO DE CLIENTE");
				}

			} else {

				if (client != null) {
					ReferenciaClientes refCliente = referenciaClientesService
							.findByreferenciaClienteAndclienteId(pedido.getReferencia_cliente(), client.getId());

					if (refCliente != null) {
						ReferenciaClientes refClienteBD = referenciaClientesService.save(refCliente);
						logistica.setReferenciaclientes(refClienteBD);
						pedidos.setReferenciaclientes(refClienteBD);
					} else {

						ReferenciaClientes refClienteNuevo = new ReferenciaClientes();
						refClienteNuevo.setCliente(client);
						refClienteNuevo.setReferenciaCliente(pedido.getReferencia_cliente());
						referenciaClientesService.save(refClienteNuevo);
						logistica.setReferenciaclientes(refClienteNuevo);
						pedidos.setReferenciaclientes(refClienteNuevo);

					}
				}

			}

			System.out.println(logistica);

			// CREAMOS LA PARTE DE PEDIDO

			if (pedido.getConfirmacion() != null) {
				pedidos.setConfirmacion(pedido.getConfirmacion());

			}

			if (pedido.getFactura() != null) {
				pedidos.setFactura(pedido.getFactura());

			}

			if (pedido.getImporte() != null) {
				pedidos.setImporte(Float.parseFloat(pedido.getImporte().replace(",", ".")));
			}

			if (pedido.getPedido() != null) {
				pedidos.setNumPedido(pedido.getPedido());
			}

			// Insertamos en BD los pedidos y logistica
			if (client != null) {
				Logistica logisticaBD = logisticaService.save(logistica);
				pedidos.setLogistica(logisticaBD);
				pedidosService.save(pedidos);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
		return "Pedidos insertados";

	}

	public static class RepresentanteCSVEntity {
		private final String representante;

		public String getRepresentante() {
			return representante;
		}

		public RepresentanteCSVEntity(String representante) {
			super();
			this.representante = representante;
		}

	}

	public static class ClienteCSVEntity {

		private final String cliente;

		private final String poblacion;

		private final String provincia;

		private final String representante;

		private final String codigocliente;

		public ClienteCSVEntity(String cliente, String poblacion, String provincia,
				String representante, String codigocliente) {
			super();
			this.cliente = cliente;
			this.poblacion = poblacion;
			this.provincia = provincia;
			this.representante = representante;
			this.codigocliente = codigocliente;
		}

		

		public String getCliente() {
			return cliente;
		}

		public String getPoblacion() {
			return poblacion;
		}

		public String getProvincia() {
			return provincia;
		}

		public String getRepresentante() {
			return representante;
		}



		public String getCodigocliente() {
			return codigocliente;
		}

		

	}

	public static class EntradaCSVEntity {

		private final String fecha_pedido;

		private final String pedido;

		private final String confirmacion;

		private final String ruta;

		private final String carro;

		private final String referencia_cliente;

		private final String codigo_cliente;

		private final String cliente;

		private final String importe;

		private final String estado;

		private final String transportista;

		private final String fecha_entrega;

		private final String representante;

		private final String poblacion;

		private final String provincia;

		private final String factura;
		
		

		public EntradaCSVEntity(String fecha_pedido, String pedido, String confirmacion, String ruta, String carro,
				String referencia_cliente, String codigo_cliente, String cliente, String importe, String estado,
				String transportista, String fecha_entrega,  String representante, String poblacion, String provincia,
				String factura) {
			super();
			this.fecha_pedido = fecha_pedido;
			this.pedido = pedido;
			this.confirmacion = confirmacion;
			this.ruta = ruta;
			this.carro = carro;
			this.referencia_cliente = referencia_cliente;
			this.codigo_cliente = codigo_cliente;
			this.cliente = cliente;
			this.importe = importe;
			this.estado = estado;
			this.transportista = transportista;
			this.fecha_entrega = fecha_entrega;
			this.poblacion = poblacion;
			this.provincia = provincia;
			this.factura = factura;
			this.representante = representante;
		}

		public String getFecha_pedido() {
			return fecha_pedido;
		}

		public String getPedido() {
			return pedido;
		}

		public String getConfirmacion() {
			return confirmacion;
		}

		public String getRuta() {
			return ruta;
		}

		public String getCarro() {
			return carro;
		}

		public String getReferencia_cliente() {
			return referencia_cliente;
		}

		public String getCodigo_cliente() {
			return codigo_cliente;
		}

		public String getCliente() {
			return cliente;
		}

		public String getImporte() {
			return importe;
		}

		public String getEstado() {
			return estado;
		}

		public String getTransportista() {
			return transportista;
		}

		public String getFecha_entrega() {
			return fecha_entrega;
		}

		
		public String getPoblacion() {
			return poblacion;
		}

		public String getProvincia() {
			return provincia;
		}

		public String getFactura() {
			return factura;
		}

		public String getRepresentante() {
			return representante;
		}

		@Override
		public String toString() {
			return "EntradaCSVEntity [fecha_pedido=" + fecha_pedido + ", pedido=" + pedido + ", confirmacion="
					+ confirmacion + ", ruta=" + ruta + ", carro=" + carro + ", referencia_cliente="
					+ referencia_cliente + ", codigo_cliente=" + codigo_cliente + ", cliente=" + cliente + ", importe="
					+ importe + ", estado=" + estado + ", transportista=" + transportista + ", fecha_entrega="
					+ fecha_entrega + ", poblacion=" + poblacion + ", provincia=" + provincia
					+ ", factura=" + factura + ", representante=" + representante + "]";
		}

		
	}
}
