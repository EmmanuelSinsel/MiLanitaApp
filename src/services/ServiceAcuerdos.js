import { GetUserId } from "../Utils";
import { APIURL } from "./API";


const registrarAcuerdoAPI = async (nuevoAcuerdo) => {
    url = APIURL+"acuerdos/registrar_acuerdo"
    try {
        const response = await fetch(url
            ,{  
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoAcuerdo)});
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}
const eliminarPreregistroAcuerdoAPI = async (idAcuerdo) => {
    url = APIURL+"acuerdos/eliminar_preregistro?id_acuerdo="+idAcuerdo
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
const getDetalleAcuerdoAPI = async (id) => {
    url = APIURL+"acuerdos/detalle_acuerdo?id_acuerdo="+String(id)
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};
const getListaAcuerdosAPI = async (p, pSize, filtro) => {
    url = ""
    if(filtro == ""){
        url = APIURL+"acuerdos/lista_acuerdos?p="+p+"&p_size="+pSize
    }
    else{
        url = APIURL+"acuerdos/lista_acuerdos?p="+p+"&p_size="+pSize+"&filtro="+filtro
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
const getSiguienteIdAcuerdoAPI = async () => {
    url = APIURL+"acuerdos/siguiente_id"
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};
const registrarAbonosAcuerdoAPI = async (nuevoAbonosAcuerdo) => {
    url = APIURL+"acuerdos/guardar_lista_abonos_acuerdo"
    try {
        const response = await fetch(url
            ,{  
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoAbonosAcuerdo)});
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}
const getListaAbonosAcuerdoAPI = async (id_ruta) => {
    url = APIURL+"acuerdos/get_lista_abonos_acuerdo?id_ruta="+String(id_ruta)
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

export {getListaAcuerdosAPI,
        getSiguienteIdAcuerdoAPI,
        getDetalleAcuerdoAPI,
        registrarAcuerdoAPI,
        eliminarPreregistroAcuerdoAPI,
        registrarAbonosAcuerdoAPI,
        getListaAbonosAcuerdoAPI}