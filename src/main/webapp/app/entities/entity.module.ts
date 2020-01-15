import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TorgaPedidosClienteModule } from './cliente/cliente.module';
import { TorgaPedidosReferenciaClientesModule } from './referencia-clientes/referencia-clientes.module';
import { TorgaPedidosRepresentanteModule } from './representante/representante.module';
import { TorgaPedidosLogisticaModule } from './logistica/logistica.module';
import { TorgaPedidosPedidosModule } from './pedidos/pedidos.module';
import { TorgaPedidosVistaClienteModule } from './vista-cliente/vista-cliente.module';
import { TorgaPedidosVistaRepresentanteModule } from './vista-representante/vista-representante.module';
import { TorgaPedidosVistaAdminModule } from './vista-admin/vista-admin.module';
import { TorgaPedidosTransportistasModule } from './transportistas/transportistas.module';
import { TorgaPedidosEstadosModule } from './estados/estados.module';
import { TorgaPedidosRepresenTorgaModule } from './represen-torga/represen-torga.module';
import { TorgaPedidosCategorias_DormitorioModule } from './categorias-dormitorio/categorias-dormitorio.module';
import { TorgaPedidosCategoriasDormiModule } from './categorias-dormi/categorias-dormi.module';
import { TorgaPedidosProductosDormitorioModule } from './productos-dormitorio/productos-dormitorio.module';
import { TorgaPedidosDimensionesProductoModule } from './dimensiones-producto/dimensiones-producto.module';
import { TorgaPedidosAcabadosModule } from './acabados/acabados.module';
import { TorgaPedidosAcabadosProductoModule } from './acabados-producto/acabados-producto.module';
import { TorgaPedidosAcaProdModule } from './aca-prod/aca-prod.module';
import { TorgaPedidosTiposApoyoModule } from './tipos-apoyo/tipos-apoyo.module';
import { TorgaPedidosTipoProductoModule } from './tipo-producto/tipo-producto.module';
import { TorgaPedidosDimensionesProductoTipoModule } from './dimensiones-producto-tipo/dimensiones-producto-tipo.module';
import { TorgaPedidosComposicionModule } from './composicion/composicion.module';
import { TorgaPedidosProductosComposicionModule } from './productos-composicion/productos-composicion.module';
import { TorgaPedidosAcabadosComposicionModule } from './acabados-composicion/acabados-composicion.module';
import { TorgaPedidosInterioresArmariosModule } from './interiores-armarios/interiores-armarios.module';
import { TorgaPedidosInterioresModule } from './interiores/interiores.module';
import { TorgaPedidosPresupuestoPedidoModule } from './presupuesto-pedido/presupuesto-pedido.module';
import { TorgaPedidosDatosUsuarioModule } from './datos-usuario/datos-usuario.module';
import { TorgaPedidosVendedoresModule } from './vendedores/vendedores.module';
import { TorgaPedidosTiradoresArmarioModule } from './tiradores-armario/tiradores-armario.module';
import { TorgaPedidosMensajesModule } from './mensajes/mensajes.module';
import { TorgaPedidosPrecioTiendaModule } from './precio-tienda/precio-tienda.module';
import { TorgaPedidosMedidasEspecialesModule } from './medidas-especiales/medidas-especiales.module';
import { TorgaPedidosMedEspProductoPedidoPresuModule } from './med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.module';
import { TorgaPedidosRepresentanteTiendaModule } from './representante-tienda/representante-tienda.module';
import { TorgaPedidosContactoFabricaModule } from './contacto-fabrica/contacto-fabrica.module';
import { TorgaPedidosImagenesContactoFabricaModule } from './imagenes-contacto-fabrica/imagenes-contacto-fabrica.module';
import { TorgaPedidosPagosTorgaTiendasModule } from './pagos-torga-tiendas/pagos-torga-tiendas.module';
import { TorgaPedidosPuertasModule } from './puertas/puertas.module';
import { TorgaPedidosArmarioModule } from './armario/armario.module';
import { TorgaPedidosCascoModule } from './casco/casco.module';
import { TorgaPedidosIvaProductoTiendaModule } from './iva-producto-tienda/iva-producto-tienda.module';
import { TorgaPedidosPuertasPreciosModule } from './puertas-precios/puertas-precios.module';
import { TorgaPedidosInterioresArmarioNuevosModule } from './interiores-armario-nuevos/interiores-armario-nuevos.module';
import { TorgaPedidosInteriorArmarioDentroModule } from './interior-armario-dentro/interior-armario-dentro.module';

@NgModule({
    // prettier-ignore
    imports: [
        TorgaPedidosClienteModule,
        TorgaPedidosVendedoresModule,
        TorgaPedidosRepresenTorgaModule,
        TorgaPedidosProductosComposicionModule,
        TorgaPedidosAcabadosComposicionModule,
        TorgaPedidosComposicionModule,
        TorgaPedidosInterioresModule,
        TorgaPedidosInterioresArmariosModule,
        TorgaPedidosPrecioTiendaModule,
        TorgaPedidosReferenciaClientesModule,
        TorgaPedidosPagosTorgaTiendasModule,
        TorgaPedidosRepresentanteTiendaModule,
        TorgaPedidosPuertasModule,
        TorgaPedidosImagenesContactoFabricaModule,
        TorgaPedidosRepresentanteModule,
        TorgaPedidosMedEspProductoPedidoPresuModule,
        TorgaPedidosCascoModule,
        TorgaPedidosPuertasPreciosModule,
        TorgaPedidosInterioresArmarioNuevosModule,
        TorgaPedidosLogisticaModule,
        TorgaPedidosPedidosModule,
        TorgaPedidosTiradoresArmarioModule,
        TorgaPedidosContactoFabricaModule,
        TorgaPedidosVistaClienteModule,
        TorgaPedidosVistaRepresentanteModule,
        TorgaPedidosMensajesModule,
        TorgaPedidosInteriorArmarioDentroModule,
        TorgaPedidosVistaAdminModule,
        TorgaPedidosArmarioModule,
        TorgaPedidosTransportistasModule,
        TorgaPedidosEstadosModule,
        TorgaPedidosCategorias_DormitorioModule,
        TorgaPedidosCategoriasDormiModule,
        TorgaPedidosMedidasEspecialesModule,
        TorgaPedidosProductosDormitorioModule,
        TorgaPedidosDimensionesProductoModule, 
        TorgaPedidosAcabadosModule,
        TorgaPedidosPresupuestoPedidoModule,
        TorgaPedidosAcabadosProductoModule,
        TorgaPedidosAcaProdModule,
        TorgaPedidosTiposApoyoModule,
        TorgaPedidosTipoProductoModule,
        TorgaPedidosDimensionesProductoTipoModule,
        TorgaPedidosIvaProductoTiendaModule,
        TorgaPedidosDatosUsuarioModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosEntityModule {}
