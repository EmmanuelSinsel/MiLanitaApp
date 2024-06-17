import API from "./API";
import { APIURL } from "./API";

const getRutasAPI = async () => {
    url = APIURL+"ruta/lista_rutas"
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getGruposAPI = async (id) => {
    url = APIURL+"grupo/lista_grupos?id_ruta="+id
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getCorteAPI = async (ruta) => {
    url = APIURL+"caja/get_corte_ruta?id_ruta="+ruta
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getStatusCajasAPI = async () => {
    url = APIURL+"caja/get_status_cajas"
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getCajaRutaAPI = async (idRuta) => {
    url = APIURL+"caja/get_caja_ruta?id_ruta="+idRuta
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getPreregistroCajaAPI = async () => {
    url = APIURL+"caja/siguiente_id_caja"
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getIdCajaRutaAPI = async (ruta) => {
    url = APIURL+"caja/get_id_caja_ruta?id_ruta="+ruta
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const eliminarPreregistroCajaAPI = async(id_caja) => {
    url = APIURL+"caja/eliminar_preregistro_caja?id_caja="+id_caja
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const abrirCajaAPI = async(caja) => {
    url = APIURL+"caja/abrir_caja"
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

const cerrarCajaAPI = async(idCaja, montoFinal, montoEntregado) => {
    url = APIURL+"caja/cerrar_caja?id_caja="+idCaja+"&monto_final="+montoFinal+"&monto_entregado="+montoEntregado
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getGaleriaAPI = async(p, pSize, idGrupo, filtro) => {
    url = APIURL+"galeria/lista_imagenes?id_grupo="+idGrupo+"&p="+p+"&p_size="+pSize+"&not_finalized=false&desc=false"
    if(filtro != ""){
        url = url + "&filtro="+filtro
    }
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getThumbnailAPI = async(idPrestamo, thumbnailType) => {
    url = APIURL+"galeria/prestamo_thumbnail?id_prestamo="+idPrestamo+"&thumbnail_type="+thumbnailType
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

export {getRutasAPI, 
        getGruposAPI, 
        getCorteAPI, 
        getStatusCajasAPI, 
        getCajaRutaAPI, 
        getPreregistroCajaAPI, 
        getIdCajaRutaAPI, 
        eliminarPreregistroCajaAPI, 
        abrirCajaAPI, 
        cerrarCajaAPI,
        getGaleriaAPI,
        getThumbnailAPI}