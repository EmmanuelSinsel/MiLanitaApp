import API from "./API";

class ServiceAuth{
    api = new API()

    login = async (usuario, password) => {
        url = this.api.URL+"auth/login?usuario="+usuario+"&password="+password
        try {
            const response = await fetch(url
            );
            const json = await response.json();
            return json;
        } catch (error) {
            return String(error);
        }
    };
}

export default ServiceAuth;