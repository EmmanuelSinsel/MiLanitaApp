import API from "./API";

class ServicePrestamos{
    api = new API()
    
    registrarPrestamo = async (nuevo_prestamo) => {
        url = this.api.URL+"prestamos/registrar_prestamo"
        try {
            const response = await fetch(url
                ,{  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevo_prestamo)});
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    calcularPrestamo = async (importe, plazo) => {
        url = this.api.URL+"prestamos/calcular_prestamo?importe="+importe+"&plazo="+plazo
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    getPrestamos = async (p, pSize, filtro) => {
        url = ""
        if(filtro == ""){
            url = this.api.URL+"prestamos/lista_prestamos?p="+p+"&p_size="+pSize
        }
        else{
            url = this.api.URL+"prestamos/lista_prestamos?p="+p+"&p_size="+pSize+"&filtro="+filtro
        }
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    getPrestamosExtraCobranza = async (p, grupo, pSize, filtro) => {
        url = ""
        if(filtro == ""){
            url = this.api.URL+"prestamos/lista_prestamos_extra_cobranza?p="+p+"&grupo="+grupo+"&p_size="+pSize
        }
        else{
            url = this.api.URL+"prestamos/lista_prestamos_extra_cobranza?p="+p+"&grupo="+grupo+"&p_size="+pSize+"&filtro="+filtro
        }
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    getDetallePrestamo = async (id) => {
        url = this.api.URL+"prestamos/detalle_prestamos?id_prestamo="+id
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }
    
    get_detalle_abono_extra = async (id) => {
        url = this.api.URL+"prestamos/detalle_abono_extra?id_prestamo="+id
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    getSiguienteId = async () => {
        url = this.api.URL+"prestamos/siguiente_id"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

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

    getGrupos = async (id) => {
        url = this.api.URL+"grupo/lista_grupos?id_ruta="+id
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    get_imagen = async (idPrestamo, imageType) => {
        url = this.api.URL+"prestamos/get_imagen?id_prestamo="+idPrestamo+"&image_type="+imageType
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    checkAval = async (id) => {
        url = this.api.URL+"prestamos/check_aval?id_aval="+id
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    eliminarPreregistro = async (idPrestamo) => {
        url = this.api.URL+"prestamos/eliminar_preregistro?id_prestamo="+idPrestamo
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

    getLastAval = async (idCliente) => {
        url = this.api.URL+"prestamos/get_last_aval?id_cliente="+idCliente
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

}

export default ServicePrestamos