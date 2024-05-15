import API from "./API";

class ServiceOtros{
    api = new API()

    getRutas = async () => {
        url = this.api.URL+"ruta/lista_rutas"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    getGrupos = async () => {
        url = this.api.URL+"grupo/lista_grupos"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    getCorte = async (ruta) => {
        url = this.api.URL+"caja/get_corte_ruta?id_ruta="+ruta
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    getStatusCajas = async () => {
        url = this.api.URL+"caja/get_status_cajas"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    getCajaRuta = async (idRuta) => {
        url = this.api.URL+"caja/get_caja_ruta?id_ruta="+idRuta
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    getPreregistroCaja = async () => {
        url = this.api.URL+"caja/siguiente_id_caja"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    getIdCajaRuta = async (ruta) => {
        url = this.api.URL+"caja/get_id_caja_ruta?id_ruta="+ruta
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }


    eliminarPreregistroCaja = async(id_caja) => {
        url = this.api.URL+"caja/eliminar_preregistro_caja?id_caja="+id_caja
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    abrirCaja = async(caja) => {
        url = this.api.URL+"caja/abrir_caja"
        try {
            const response = await fetch(url
                ,{  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(caja)});
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    cerrarCaja = async(idCaja, montoFinal, montoEntregado) => {
        url = this.api.URL+"caja/cerrar_caja?id_caja="+idCaja+"&monto_final="+montoFinal+"&monto_entregado="+montoEntregado
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