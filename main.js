
//capturar los elementos del DOM
let notas_input = document.getElementById("notasIngresadas")
let agregarEstudianteBtn = document.getElementById("guardarEstudianteBtn")
let agregarNotas = document.getElementById("agregarNotasBtn")
let estudiantesDiv = document.getElementById("estudiantesDiv")
let buscador = document.getElementById("buscador")
let verLista = document.getElementById("verLista")
let ocultarLista = document.getElementById("ocultarLista")
let selectOrden = document.getElementById("selectOrden")
let coincidencia = document.getElementById("coincidencia")
let buscarBtn = document.getElementById("btnBuscar")

//funciones proyecto


//funcion que permite agregar los espacios para ingresar las notas
function notas() {

    let cantidadNotasIngresadas = document.getElementById("cantidadNotasInput").value
    if (cantidadNotasIngresadas <= 0 || cantidadNotasIngresadas > 10 || isNaN(cantidadNotasIngresadas)) {
        Swal.fire({
            title: `Por favor ingrese un número válido`,
            icon: 'warning',
            confirmButtonColor: 'green',
            confirmButtonText: 'Ok'
        })
        return
    }

    notas_input.innerHTML = ``

    for (let i = 0; i < cantidadNotasIngresadas; i++) {

        notas_input.innerHTML +=
            `<div class="mb-3">
            <label for="nota${i}" class="form-label">nota ${i + 1} : entre 0 y 10</label>
            <input type="number" class="form-control" id=nota${i} aria-describedby=nota${i}>
        </div>`
    }

}

//función que permite mostrar los estudiantes
function mostrarEstudiantes(array) {
    estudiantesDiv.innerHTML = ""
    for (let estudiante of array) {
        estudiantesDiv.innerHTML += `<div class="card" style="width: 18rem;" id="estudiante${estudiante.id}">
        <div class="card-body">
          <h5 class="card-title letra fw-bold">${estudiante.nombre}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${estudiante.curso}</h6>
          <p class="card-text">Promedio: ${estudiante.promedio.toFixed(2)}</p>
          <p class="card-text">Notas: ${estudiante.array_notas}</p>
          <button class= "btn btn-danger" id="botonEliminar${estudiante.id}"><i class="fas fa-trash-alt"></i></button>
          `
    }

    array.forEach((estudiante) => {

        document.getElementById(`botonEliminar${estudiante.id}`).addEventListener("click", () => {
            Swal.fire({
                title: `¿Está seguro/a de eliminar el/la estudiante ${estudiante.nombre}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Estudiante eliminado/a',
                        icon: 'success',
                        confirmButtonColor: 'green',
                        confirmButtonText: 'Ok',
                    })
                    console.log(`Eliminar estudiante`)
                    //borrar del DOM
                    let cardEstudiante = document.getElementById(`estudiante${estudiante.id}`)
                    cardEstudiante.remove()
                    //borrar del array
                    //encontramos objeto a eliminar
                    let productoEliminar = array.find((estudiante1) => estudiante1.id == estudiante.id)
                    console.log(productoEliminar)
                    //buscar indice
                    let posicion = array.indexOf(productoEliminar)
                    console.log(posicion)
                    array.splice(posicion, 1)
                    console.log(array)
                    //setear storage
                    localStorage.setItem("estudiantes", JSON.stringify(array))
                } else {
                    Swal.fire({
                        title: `El/la estudiante ${estudiante.nombre} no se ha eliminado`,
                        icon: 'info',
                        confirmButtonColor: 'green',
                        confirmButtonText: 'El estudiante sigue en la lista',
                        timer: 3000


                    })
                }
            })
        })
    })
}



//función que permite capturar las notas que ingresa el usuario
function capturarNotas(cant_notas) {
    let array_notas = []
    let total = 0
    for (let i = 0; i < cant_notas; i++) {
        let nota = document.getElementById(`nota${i}`).value
        if (nota < 0 || nota > 10) {
            Swal.fire({
                title: `Por favor ingrese un número válido`,
                icon: 'warning',
                confirmButtonColor: 'green',
                confirmButtonText: 'Ok'
            })
            return
        } else {
            array_notas.push(parseInt(nota))
            total += parseInt(nota)



        }

    }
    return [total, array_notas]
}

//función que permite capturar los datos del estudiante y crearlo
function capturarEstudiante(array) {

    let nombreEstudianteIngresado = document.getElementById("nombreEstudianteInput")
    let nombreCursoIngresado = document.getElementById("nombreCursoInput")
    let cantidadNotasIngresadas = document.getElementById("cantidadNotasInput")

    if (nombreEstudianteIngresado.value == "" || nombreCursoIngresado.value == "" || cantidadNotasIngresadas.value == "") {
        Swal.fire({
            title: `Por favor complete todos los campos`,
            icon: 'warning',
            confirmButtonColor: 'green',
            confirmButtonText: 'Ok'
        })
        return
    }

    if (cantidadNotasIngresadas.value <= 0 || cantidadNotasIngresadas.value > 10) {
        Swal.fire({
            title: `Por favor ingrese un número válido`,
            icon: 'warning',
            confirmButtonColor: 'green',
            confirmButtonText: 'Ok'
        })
        return
    }

    try {

        let [total, array_notas] = capturarNotas(parseInt(cantidadNotasIngresadas.value))
        let promedio = total / cantidadNotasIngresadas.value
        let id = array.length + 1
        let estudiante = new Estudiante(id, nombreEstudianteIngresado.value, nombreCursoIngresado.value, cantidadNotasIngresadas.value, array_notas, promedio)
        array.push(estudiante)

        Swal.fire({
            title: `El/la estudiante ${estudiante.nombre} se ha agregado`,
            icon: 'success',
            confirmButtonColor: 'green',
            confirmButtonText: 'Ok'
        })
        localStorage.setItem("estudiantes", JSON.stringify(array))
        mostrarEstudiantes(array)
        nombreEstudianteIngresado.value = ""
        nombreCursoIngresado.value = ""
        cantidadNotasIngresadas.value = ""
        notas_input.innerHTML = ""

    } catch (error) {
        Swal.fire({
            title: `Por favor ingrese una nota válida`,
            icon: 'warning',
            confirmButtonColor: 'green',
            confirmButtonText: 'Ok'
        })
        return
    }
}

//función que permite ordenar los estudiantes por promedio de mayor a menor
function ordenarMenorMayor(array) {
    //copia del array original, para aplicar sort y no modificar estanteria
    const menorMayor = [].concat(array)
    console.log(menorMayor)
    //de forma ascendente por el atributo precio
    menorMayor.sort((elem1, elem2) => elem1.promedio - elem2.promedio)
    mostrarEstudiantes(menorMayor)
}

//función que permite ordenar los estudiantes por promedio de menor a mayor
function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    //ordenar forma descendente
    mayorMenor.sort((elem1, elem2) => elem2.promedio - elem1.promedio)
    mostrarEstudiantes(mayorMenor)
}

//función que permite ordenar los estudiantes alfabeticamente por curso
function ordenarAlfabeticamenteCurso(array) {
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort((a, b) => {
        if (a.curso > b.curso) {
            return 1
        }
        if (a.curso < b.curso) {
            //return explicito
            return -1
        }
        // a must be equal to b
        return 0
    })

    mostrarEstudiantes(arrayAlfabetico)
}

//función que permite ordenar los estudiantes alfabeticamente por nombre
function ordenarAlfabeticamenteNombre(array) {
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            //return explicito
            return -1
        }
        // a must be equal to b
        return 0
    })

    mostrarEstudiantes(arrayAlfabetico)
}

//función que permite buscar coincidencias en el buscador
function buscarInfo(buscado, array) {
    let busqueda = array.filter(
        (dato) => dato.nombre.toLowerCase().includes(buscado.toLowerCase()) || dato.curso.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con la búsqueda ${buscado}</h3>`,
            mostrarEstudiantes(busqueda)) :
        (coincidencia.innerHTML = "", mostrarEstudiantes(busqueda))
}


//EVENTOS:
agregarNotas.addEventListener("click", function (event) {
    //nos permite que no se actualice al ejecutar el evento
    event.preventDefault()
    notas()
})

agregarEstudianteBtn.addEventListener("click", function (event) {
    event.preventDefault()
    capturarEstudiante(array_estudiantes)
})

verLista.addEventListener("click", () => {
    mostrarEstudiantes(array_estudiantes)
})

ocultarLista.addEventListener("click", () => {
    estudiantesDiv.innerHTML = ""
})

selectOrden.addEventListener("change", () => {
    console.log(selectOrden.value)
    switch (selectOrden.value) {
        case "1":
            ordenarMayorMenor(array_estudiantes)
            break
        case "2":
            ordenarMenorMayor(array_estudiantes)
            break
        case "3":
            ordenarAlfabeticamenteCurso(array_estudiantes)
            break
        case "4":
            ordenarAlfabeticamenteNombre(array_estudiantes)
        default:
            mostrarEstudiantes(array_estudiantes)
            break
    }
}
)

buscador.addEventListener("input", () => {
    buscarInfo(buscador.value, array_estudiantes)
})

buscarBtn.addEventListener("click", (event) => {
    event.preventDefault()
    buscarInfo(buscador.value, array_estudiantes)
})
