// Proyecto estudiantes

// class constructora

class Estudiante {
    constructor(id, nombre, curso, cant_notas, array_notas, promedio) {
        this.id = id;
        this.nombre = nombre;
        this.curso = curso;
        this.cant_notas = cant_notas;
        this.array_notas = array_notas;
        this.promedio = promedio;
    }

    //metodos
    mostrarInfoEstudiante() {
        console.log(`Estudiante ${this.nombre} con id ${this.id} del curso ${this.curso} tiene un promedio de ${this.promedio} y sus notas son ${this.array_notas}`)
    }

}

//función que nos permite cargar los estudiantes desde un JSON
const cargarEstudiantes = async () => {
    const res = await fetch("estudiantes.json")
    const data = await res.json()

    for (let estudiante of data) {
        let estudiante_nuevo = new Estudiante(parseInt(estudiante.id), estudiante.nombre, estudiante.curso, estudiante.cant_notas, estudiante.array_notas, estudiante.promedio)
        array_estudiantes.push(estudiante_nuevo)
    }
    localStorage.setItem("estudiantes", JSON.stringify(array_estudiantes))
}

let array_estudiantes = []
let array_estudiantes_lectura = []

// if que nos permite cargar los estudiantes desde el storage si ya existen o cargarlos desde el JSON si es la primera vez
if (localStorage.getItem("estudiantes")) {
    //si existe la key estanteria en el storage, va a entrar aca
    //cuando no es la primera vez, me traigo el JSON creado
    array_estudiantes_lectura = JSON.parse(localStorage.getItem("estudiantes"))
    for (const objeto of array_estudiantes_lectura) {
        let estudiante_nuevo = new Estudiante(parseInt(objeto.id), objeto.nombre, objeto.curso, objeto.cant_notas, objeto.array_notas, objeto.promedio)
        array_estudiantes.push(estudiante_nuevo)
    }
} else {

    console.log(`ENTRA POR PRIMERA VEZ. SETEAMOS ARRAY`)
    cargarEstudiantes()
}