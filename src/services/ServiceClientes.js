import API from "./API";

class ServiceClientes{
    api = new API()

    get_lista_clientes = async (id_grupo, filtro) => {
        url = ""
        if(filtro == ""){
            url = this.api.URL+"clientes/lista_clientes?grupo="+String(id_grupo)
        }
        else{
            url = this.api.URL+"clientes/lista_clientes?filtro="+filtro+"&grupo="+id_grupo

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
}

export default ServiceClientes