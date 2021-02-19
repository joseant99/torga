package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DatosUsuario;
import com.torga.pedidos.domain.PresupuestoArmario;
import com.torga.pedidos.domain.PresupuestoPedido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * Spring Data  repository for the PresupuestoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoPedidoRepository extends JpaRepository<PresupuestoPedido, Long> {

    @Query("select presupuesto_pedido from PresupuestoPedido presupuesto_pedido where presupuesto_pedido.user.login = ?#{principal.username}")
    List<PresupuestoPedido> findByUserIsCurrentUser();

    @Query("select presupuesto_pedido from PresupuestoPedido presupuesto_pedido where presupuesto_pedido.usuarioCreadoPre.login = ?#{principal.username}")
    List<PresupuestoPedido> findByUsuarioCreadoPreIsCurrentUser();
    
    @Query("Select MAX(u.id) from PresupuestoPedido u ")
	Collection<PresupuestoPedido> findByPresupuesto();
    
    @Query("Select u from PresupuestoPedido u order by u.fecha_pedido desc")
	Collection<PresupuestoPedido> findByPresupuesto1();
    

    @Query("Select u from PresupuestoPedido u where u.pedido = 1 order by u.id asc")
	Collection<PresupuestoPedido> busquing9999();
    
    @Query("Select u.fecha_prevista from PresupuestoPedido u where u.pedido = 1 and u.id = (Select max(o.id) from PresupuestoPedido o where o.fecha_prevista is not null)")
	Collection<PresupuestoPedido> sacarUltimaFecha();
    
    @Query("Select u from PresupuestoPedido u where u.pedido = 1 and u.sumado = 0")
	Collection<PresupuestoPedido> busquedaSumado0();
    
}
