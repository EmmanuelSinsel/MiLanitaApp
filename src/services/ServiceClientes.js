import API from "./API";

class ServiceClientes{
    api = new API()

    get_lista_clientes = async (p, p_size, id_grupo, filtro) => {
        url = this.api.URL+"clientes/lista_clientes?grupo="+String(id_grupo)
        if(filtro != ""){
            url += "&filtro="+filtro
        }
        if(p != null){
            url += "&p="+p
        }
        if(p_size != null){
            url += "&p_size="+p_size
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

    get_detalle_cliente = async (id) => {
        url = this.api.URL+"clientes/detalle_cliente?id_cliente="+String(id)
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    get_siguiente_id = async () => {
        url = this.api.URL+"clientes/siguiente_id"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    registrar_cliente = async (nuevo_cliente) => {
        url = this.api.URL+"clientes/registrar_cliente"
        try {
            const response = await fetch(url
                ,{  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevo_cliente)});
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    eliminar_preregistro = async (id_cliente) => {
        url = this.api.URL+"clientes/eliminar_preregistro?id_cliente="+id_cliente
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