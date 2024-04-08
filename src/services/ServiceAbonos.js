import API from "./API";

class ServiceAbonos{
    api = new API()

    get_lista_abonos = async (id_grupo) => {
        url = this.api.URL+"prestamos/get_lista_abonos?grupo="+id_grupo
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };



}

export default ServiceAbonos