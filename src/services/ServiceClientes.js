import API from "./API";
import { GetUserId } from "../Utils";
import { APIURL } from "./API";

const getListaClientesAPI = async (p, pSize, idGrupo, filtro) => {
    url = APIURL+"clientes/lista_clientes?grupo="+String(idGrupo)
    if(filtro != ""){
        url += "&filtro="+filtro
    }
    if(p != null){
        url += "&p="+p
    }
    if(pSize != null){
        url += "&p_size="+pSize
    }
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const get_lista_avalesAPI = async (filtro) => {
    url = ""
    if(filtro == ""){
        url = APIURL+"clientes/lista_avales"
    }
    else{
        url = APIURL+"clientes/lista_avales?filtro="+filtro
    }

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const getDetalleClienteAPI = async (id) => {
    url = APIURL+"clientes/detalle_cliente?id_cliente="+String(id)
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const getSiguienteIdClienteAPI = async () => {
    url = APIURL+"clientes/siguiente_id"
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const getSiguienteIdAvalAPI = async (idCliente) => {
    url = APIURL+"clientes/siguiente_id_aval?id_cliente="+idCliente
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const registrar_clienteAPI = async (nuevoCliente) => {
    url = APIURL+"clientes/registrar_cliente"
    try {
        const response = await fetch(url
            ,{  
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoCliente)});
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const registrar_avalAPI = async (nuevoAval) => {
    url = APIURL+"clientes/registrar_aval"
    try {
        const response = await fetch(url
            ,{  
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoAval)});
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

const eliminarPreregistroClienteAPI = async (idCliente) => {
    url = APIURL+"clientes/eliminar_preregistro?id_cliente="+idCliente
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

const eliminarPreregistroAvalAPI = async (idAval) => {
    url = APIURL+"clientes/eliminar_preregistro_aval?id_aval="+idAval
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

const getLastAvalAPI = async (idCliente) => {
    url = APIURL+"prestamos/get_last_aval?id_cliente="+idCliente
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

export {getListaClientesAPI, 
        get_lista_avalesAPI, 
        getDetalleClienteAPI, 
        getSiguienteIdClienteAPI, 
        getSiguienteIdAvalAPI, 
        registrar_clienteAPI, 
        registrar_avalAPI, 
        eliminarPreregistroClienteAPI, 
        eliminarPreregistroAvalAPI, 
        getLastAvalAPI}