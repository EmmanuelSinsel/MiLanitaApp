
class Ubicacion{
    latitude = ""
    longitude = ""
    constructor(lat, lon){
        this.latitude = lat
        this.longitude = lon
    }
}

class Prestamo{
    id_prestamo = 0
    id_ruta = 0
    id_grupo = 0
    nombre_cliente = ""
    nombre_aval = ""
    importe_prestamo = 0.0
    plazo_prestamo = 0
    pagare_prestamo = ""
    fecha_prestamo = ""
    estatus_prestamo = 0
    ubicacion = new Ubicacion("", "")
    foto_domicilio = ""
    foto_ine = ""
    foto_garantia = ""
    intereses_prestamo = 0.0
    seguro_prestamo = 0.0
    abono_prestamo = 0.0
    total_prestamo = 0.0
    constructor(id_prestamo,
                id_ruta,
                id_grupo,
                nombre_cliente,
                nombre_aval,
                importe_prestamo,
                plazo_prestamo,
                pagare_prestamo,
                fecha_prestamo,
                estatus_prestamo,
                ubicacion,
                foto_domicilio,
                foto_ine,
                foto_garantia,
                intereses_prestamo,
                seguro_prestamo,
                abono_prestamo,
                total_prestamo){
        this.id_prestamo = id_prestamo
        this.id_ruta = id_ruta
        this.id_grupo = id_grupo
        this.nombre_cliente = nombre_cliente
        this.nombre_aval = nombre_aval
        this.importe_prestamo = importe_prestamo
        this.plazo_prestamo = plazo_prestamo
        this.pagare_prestamo = pagare_prestamo
        this.fecha_prestamo = fecha_prestamo
        this.estatus_prestamo = estatus_prestamo
        this.ubicacion = ubicacion 
        this.foto_domicilio = foto_domicilio
        this.foto_ine = foto_ine
        this.foto_garantia = foto_garantia 
        this.intereses_prestamo = intereses_prestamo
        this.seguro_prestamo = seguro_prestamo 
        this.abono_prestamo = abono_prestamo
        this.total_prestamo = total_prestamo
    }
}

class Cliente{
    id_cliente = 0
    id_ruta = 0
    id_grupo = 0
    nombre_cliente = ""
    domicilio_cliente = ""
    telefono_cliente = ""
    tipo_cliente = 0
    constructor(id_cliente,
                id_ruta,
                id_grupo,
                nombre_cliente ,
                domicilio_cliente,
                telefono_cliente ,
                tipo_cliente){
        this.id_cliente = id_cliente
        this.id_ruta = id_ruta
        this.id_grupo = id_grupo
        this.nombre_cliente = nombre_cliente
        this.domicilio_cliente = domicilio_cliente
        this.telefono_cliente =telefono_cliente 
        this.tipo_cliente = tipo_cliente
    }
}

class Acuerdo{
    id_acuerdo = 0
    id_prestamo = 0
    id_cliente = 0
    localidad = 0
    motivo = ""
    fecha_acuerdo = ""
    tipo_intervalo = 0
    intervalo = 0
    cantidad = 0.0
    lista_intervalos = []
}

class Intervalo{
    id_intervalo = 0
    id_acuerdo = 0
    no_intervalo = 0
    cantidad = 0.0
    fecha = ""
}
