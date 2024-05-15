
class Ubicacion{
    latitude = ""
    longitude = ""
    constructor(lat, lon){
        this.latitude = lat
        this.longitude = lon
    }
}

class Prestamo{
    idPrestamo = 0
    idRuta = 0
    idGrupo = 0
    nombreCliente = ""
    nombreAval = ""
    importe_prestamo = 0.0
    plazoPrestamo = 0
    pagarePrestamo = ""
    fechaPrestamo = ""
    estatusPrestamo = 0
    ubicacion = new Ubicacion("", "")
    fotoDomicilio = ""
    fotoINE = ""
    fotoGarantia = ""
    interesesPrestamo = 0.0
    seguroPrestamo = 0.0
    abonoPrestamo = 0.0
    totalPrestamo = 0.0
    constructor(idPrestamo,
                idRuta,
                idGrupo,
                nombreCliente,
                nombreAval,
                importe_prestamo,
                plazoPrestamo,
                pagarePrestamo,
                fechaPrestamo,
                estatusPrestamo,
                ubicacion,
                fotoDomicilio,
                fotoINE,
                fotoGarantia,
                interesesPrestamo,
                seguroPrestamo,
                abonoPrestamo,
                totalPrestamo){
        this.idPrestamo = idPrestamo
        this.idRuta = idRuta
        this.idGrupo = idGrupo
        this.nombreCliente = nombreCliente
        this.nombreAval = nombreAval
        this.importe_prestamo = importe_prestamo
        this.plazoPrestamo = plazoPrestamo
        this.pagarePrestamo = pagarePrestamo
        this.fechaPrestamo = fechaPrestamo
        this.estatusPrestamo = estatusPrestamo
        this.ubicacion = ubicacion 
        this.fotoDomicilio = fotoDomicilio
        this.fotoINE = fotoINE
        this.fotoGarantia = fotoGarantia 
        this.interesesPrestamo = interesesPrestamo
        this.seguroPrestamo = seguroPrestamo 
        this.abonoPrestamo = abonoPrestamo
        this.totalPrestamo = totalPrestamo
    }
}

class Cliente{
    idCliente = 0
    idRuta = 0
    idGrupo = 0
    nombreCliente = ""
    domicilio_cliente = ""
    telefono_cliente = ""
    tipoCliente = 0
    constructor(idCliente,
                idRuta,
                idGrupo,
                nombreCliente ,
                domicilio_cliente,
                telefono_cliente ,
                tipoCliente){
        this.idCliente = idCliente
        this.idRuta = idRuta
        this.idGrupo = idGrupo
        this.nombreCliente = nombreCliente
        this.domicilio_cliente = domicilio_cliente
        this.telefono_cliente =telefono_cliente 
        this.tipoCliente = tipoCliente
    }
}

class Acuerdo{
    id_acuerdo = 0
    idPrestamo = 0
    idCliente = 0
    localidad = 0
    motivo = ""
    fechaAcuerdo = ""
    tipoIntervalo = 0
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
