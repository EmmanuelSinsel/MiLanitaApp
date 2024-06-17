import API from "./API";
import { GetUserId } from "../Utils";
import { APIURL } from "./API";

const registrarPrestamoAPI = async (nuevo_prestamo) => {
    url = APIURL+"prestamos/registrar_prestamo"
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

const calcularPrestamoAPI = async (importe, plazo, id_cliente) => {
    url = APIURL+"prestamos/calcular_prestamo?importe="+importe+"&plazo="+plazo+"&id_cliente="+id_cliente
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getPrestamosAPI = async (p, pSize, filtro) => {
    url = ""
    if(filtro == ""){
        url = APIURL+"prestamos/lista_prestamos?p="+p+"&p_size="+pSize
    }
    else{
        url = APIURL+"prestamos/lista_prestamos?p="+p+"&p_size="+pSize+"&filtro="+filtro
    }
    try {
        const response = await fetch(url,
            {
                headers:{
                    UserId: await GetUserId()
                }
            });
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const getPrestamosExtraCobranzaAPI = async (p, grupo, pSize, filtro) => {
    url = ""
    if(filtro == ""){
        url = APIURL+"prestamos/lista_prestamos_extra_cobranza?p="+p+"&grupo="+grupo+"&p_size="+pSize
    }
    else{
        url = APIURL+"prestamos/lista_prestamos_extra_cobranza?p="+p+"&grupo="+grupo+"&p_size="+pSize+"&filtro="+filtro
    }
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const getDetallePrestamoAPI = async (id) => {
    url = APIURL+"prestamos/detalle_prestamos?id_prestamo="+id
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const get_detalle_abono_extraAPI = async (id) => {
    url = APIURL+"prestamos/detalle_abono_extra?id_prestamo="+id
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getSiguienteIdPrestamoAPI = async () => {
    url = APIURL+"prestamos/siguiente_id"
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const get_imagenAPI = async (idPrestamo, imageType) => {
    url = APIURL+"prestamos/get_imagen?id_prestamo="+idPrestamo+"&image_type="+imageType
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getImagenGaleriaAPI = async (idPrestamo, imageType) => {
    url = APIURL+"galeria/detalle_prestamo_galeria?id_prestamo="+idPrestamo+"&image_type="+imageType
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const getImagenGaleriaImagenAPI = async (idPrestamo, imageType) => {
    url = APIURL+"galeria/detalle_prestamo_galeria_imagen?id_prestamo="+idPrestamo+"&image_type="+imageType
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const checkAvalAPI = async (id_aval, id_cliente) => {
    url = APIURL+"prestamos/check_aval?id_aval="+id_aval+"&id_cliente="+id_cliente
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const eliminarPreregistroPrestamoAPI = async (idPrestamo) => {
    url = APIURL+"prestamos/eliminar_preregistro?id_prestamo="+idPrestamo
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

const getPrestamoAcuerdoAPI = async (idPrestamo) => {
    url = APIURL+"prestamos/get_prestamo_acuerdo?id_prestamo="+idPrestamo
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

export { registrarPrestamoAPI,
        calcularPrestamoAPI,
        getPrestamosAPI,
        getPrestamosExtraCobranzaAPI,
        getDetallePrestamoAPI,
        get_detalle_abono_extraAPI,
        getSiguienteIdPrestamoAPI,
        get_imagenAPI,
        checkAvalAPI,
        eliminarPreregistroPrestamoAPI,
        getPrestamoAcuerdoAPI,
        getImagenGaleriaAPI,
        getImagenGaleriaImagenAPI}