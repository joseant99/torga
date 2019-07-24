package com.torga.pedidos.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "files")
public class FileStorageProperties {


	private String uploadDir;
	
	private String facturasDir;
	
	private String confirmacionDir;
	
	
	public String getFacturasDir() {
		return facturasDir;
	}

	public void setFacturasDir(String facturasDir) {
		this.facturasDir = facturasDir;
	}

	public String getConfirmacionDir() {
		return confirmacionDir;
	}

	public void setConfirmacionDir(String confirmacionDir) {
		this.confirmacionDir = confirmacionDir;
	}

	public String getUploadDir() {
		return uploadDir;
	}
	
	public void setUploadDir(String uploadDir){
		this.uploadDir = uploadDir;
	}
}
