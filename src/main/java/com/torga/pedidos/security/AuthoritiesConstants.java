package com.torga.pedidos.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
    
    public static final String CLIENTE = "ROLE_CLIENTE";
    
    public static final String REPRESENTANTE = "ROLE_REPRESENTANTE";


    private AuthoritiesConstants() {
    }
}
