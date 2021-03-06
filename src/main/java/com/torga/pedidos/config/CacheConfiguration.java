package com.torga.pedidos.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.torga.pedidos.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.torga.pedidos.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Cliente.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Cliente.class.getName() + ".referenciaclientes", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.ReferenciaClientes.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.ReferenciaClientes.class.getName() + ".pedidos", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.ReferenciaClientes.class.getName() + ".logisticas", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Representante.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Representante.class.getName() + ".clientes", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Logistica.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Pedidos.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Estados.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Estados.class.getName() + ".logisticas", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Transportistas.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Transportistas.class.getName() + ".logisticas", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.CategoriasDormi.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.ProductosDormitorio.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.DimensionesProducto.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Acabados.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.AcaProd.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.AcaProd.class.getName() + ".acabados", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.TiposApoyo.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.TipoProducto.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.DimensionesProductoTipo.class.getName(), jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Acabados.class.getName() + ".acaProds", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Composicion.class.getName() , jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.ProductosComposicion.class.getName() , jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.ProductosComposicion.class.getName() + ".acabadosComposicions", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.AcabadosComposicion.class.getName() , jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.AcabadosComposicion.class.getName() + ".productosComposicion", jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.Interiores.class.getName() , jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.PresupuestoPedido.class.getName() , jcacheConfiguration);
            cm.createCache(com.torga.pedidos.domain.ProductosPresupuestoPedidos.class.getName() , jcacheConfiguration);




        };
    }
}
