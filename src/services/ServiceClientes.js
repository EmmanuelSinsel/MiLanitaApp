import API from "./API";

class ServiceClientes{
    api = new API()

    getListaClientes = async (p, pSize, idGrupo, filtro) => {
        url = this.api.URL+"clientes/lista_clientes?grupo="+String(idGrupo)
        if(filtro != ""){
            url += "&filtro="+filtro
        }
        if(p != null){
            url += "&p="+p
        }
        if(pSize != null){
            url += "&p_size="+pSize
        }
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    get_lista_avales = async (filtro) => {
        console.log(url)
        url = ""
        if(filtro == ""){
            url = this.api.URL+"clientes/lista_avales"
        }
        else{
            url = this.api.URL+"clientes/lista_avales?filtro="+filtro
        }

        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    getDetalleCliente = async (id) => {
        url = this.api.URL+"clientes/detalle_cliente?id_cliente="+String(id)
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    getSiguienteId = async () => {
        url = this.api.URL+"clientes/siguiente_id"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    getSiguienteIdAval = async (idCliente) => {
        url = this.api.URL+"clientes/siguiente_id_aval?id_cliente="+idCliente
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    registrar_cliente = async (nuevoCliente) => {
        url = this.api.URL+"clientes/registrar_cliente"
        try {
            const response = await fetch(url
                ,{  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoCliente)});
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    registrar_aval = async (nuevoAval) => {
        url = this.api.URL+"clientes/registrar_aval"
        try {
            const response = await fetch(url
                ,{  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoAval)});
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    eliminarPreregistro = async (idCliente) => {
        url = this.api.URL+"clientes/eliminar_preregistro?id_cliente="+idCliente
        try {
            const response = await fetch(url
                ,{  
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }});
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    eliminarPreregistroAval = async (idAval) => {
        url = this.api.URL+"clientes/eliminar_preregistro_aval?id_aval="+idAval
        try {
            const response = await fetch(url
                ,{  
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }});
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };
}

export default ServiceClientes