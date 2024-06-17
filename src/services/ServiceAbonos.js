import { APIURL } from "./API";

const getListaAbonosAPI = async (idGrupo) => {
    url = APIURL+"prestamos/get_lista_abonos?grupo="+idGrupo
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const guardar_abonosAPI = async (abonos) => {
    url = APIURL+"prestamos/guardar_abonos"
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


export {getListaAbonosAPI, 
        guardar_abonosAPI}