import { APIURL } from "./API";

const loginAPI = async (usuario, password) => {
    url = APIURL+"auth/login?usuario="+usuario+"&password="+password
    try {
        const response = await fetch(url
        );
        const json = await response.json();
        return json;
    } catch (error) {
        return String(error);
    }
};

const getSiguienteIdEmpleadoAPI = async () => {
    url = APIURL+"usuarios/siguiente_id_empleado"
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
};

const registrarUsuarioFullAPI = async (nuevoUsuarioFull) => {
    url = APIURL+"usuarios/registrar_usuario_full"
    try {
        const response = await fetch(url
            ,{  
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuarioFull)});
        const json = await response.json();
        return json;
    } catch (error) {
    console.error(error);
    }
}

export {loginAPI,
        registrarUsuarioFullAPI,
        getSiguienteIdEmpleadoAPI
}