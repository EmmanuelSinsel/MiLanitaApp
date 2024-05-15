import API from "./API";

class ServiceAbonos{
    api = new API()

    getListaAbonos = async (idGrupo) => {
        url = this.api.URL+"prestamos/get_lista_abonos?grupo="+idGrupo
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    guardar_abonos = async (abonos) => {
        url = this.api.URL+"prestamos/guardar_abonos"
        try {
            const response = await fetch(url
                ,{  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(abonos)});
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

}

export default ServiceAbonos