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
import { TorgaPedidosInterioresModule } from './interiores/interiores.module';
import { TorgaPedidosPresupuestoPedidoModule } from './presupuesto-pedido/presupuesto-pedido.module';

@NgModule({
    // prettier-ignore
    imports: [
        TorgaPedidosClienteModule,
        TorgaPedidosProductosComposicionModule,
        TorgaPedidosAcabadosComposicionModule,
        TorgaPedidosComposicionModule,
        TorgaPedidosInterioresModule,
        TorgaPedidosReferenciaClientesModule,
        TorgaPedidosRepresentanteModule,
        TorgaPedidosLogisticaModule,
        TorgaPedidosPedidosModule,
        TorgaPedidosVistaClienteModule,
        TorgaPedidosVistaRepresentanteModule,
        TorgaPedidosVistaAdminModule,
        TorgaPedidosTransportistasModule,
        TorgaPedidosEstadosModule,
        TorgaPedidosCategorias_DormitorioModule,
        TorgaPedidosCategoriasDormiModule,
        TorgaPedidosProductosDormitorioModule,
        TorgaPedidosDimensionesProductoModule,
        TorgaPedidosAcabadosModule,
        TorgaPedidosPresupuestoPedidoModule,
        TorgaPedidosAcabadosProductoModule,
        TorgaPedidosAcaProdModule,
        TorgaPedidosTiposApoyoModule,
        TorgaPedidosTipoProductoModule,
        TorgaPedidosDimensionesProductoTipoModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosEntityModule {}
