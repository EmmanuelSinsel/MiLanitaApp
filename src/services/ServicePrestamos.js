import API from "./API";

class ServicePrestamos{
    api = new API()
    
    registrar_prestamo = async (nuevo_prestamo) => {
        url = this.api.URL+"prestamos/registrar_prestamo"
        console.log(nuevo_prestamo)
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

    calcular_prestamo = async (importe, plazo) => {
        url = this.api.URL+"prestamos/calcular_prestamo?importe="+importe+"&plazo="+plazo
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    get_prestamos = async (p, p_size, filtro) => {
        url = ""
        if(filtro == ""){
            url = this.api.URL+"prestamos/lista_prestamos?p="+p+"&p_size="+p_size
        }
        else{
            url = this.api.URL+"prestamos/lista_prestamos?p="+p+"&p_size="+p_size+"&filtro="+filtro
        }
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    };

    get_detalle_prestamo = async (id) => {
        url = this.api.URL+"prestamos/detalle_prestamos?id_prestamo="+id
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    get_siguiente_id = async () => {
        url = this.api.URL+"prestamos/siguiente_id"
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

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

    get_grupos = async (id) => {
        url = this.api.URL+"grupo/lista_grupos?id_ruta="+id
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    get_imagen = async (id_prestamo, image_type) => {
        url = this.api.URL+"prestamos/get_imagen?id_prestamo="+id_prestamo+"&image_type="+image_type
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    check_aval = async (id) => {
        url = this.api.URL+"prestamos/check_aval?id_aval="+id
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (error) {
        console.error(error);
        }
    }

    eliminar_preregistro = async (id_prestamo) => {
        url = this.api.URL+"prestamos/eliminar_preregistro?id_prestamo="+id_prestamo
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

    get_last_aval = async (id_cliente) => {
        url = this.api.URL+"prestamos/get_last_aval?id_cliente="+id_cliente
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