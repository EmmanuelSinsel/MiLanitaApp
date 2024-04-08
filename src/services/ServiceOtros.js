import API from "./API";

class ServiceOtros{
    api = new API()

    get_rutas = async () => {
        url = this.api.URL+"ruta/lista_rutas"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    get_grupos = async () => {
        url = this.api.URL+"grupo/lista_grupos"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

}

export default ServiceOtros