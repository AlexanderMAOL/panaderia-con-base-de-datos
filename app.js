let totalGeneral = 0; 

function comprar(idProducto, inputId) {

    const cantidad = parseInt(document.getElementById(inputId).value);
    let precioUnitario = 0;

  
    switch (idProducto) {
        case 1: // Pan de Muerto
            precioUnitario = 20;
            break;
        case 2: // Concha
            precioUnitario = 15;
            break;
        case 3: // Dona
            precioUnitario = 15;
            break;
        case 4: // Polvoron
            precioUnitario = 15;
            break;
        case 5: // Pan Blanco
            precioUnitario = 30;
            break;
        default:
            console.error('Producto no reconocido');
            return;
    }

    console.log(`Intentando comprar producto ID ${idProducto} con cantidad ${cantidad}`);

    fetch('http://localhost:3000/comprar', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_producto: idProducto,
            cantidad: cantidad
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta del servidor:", data);
        
        if (data.message === 'Compra realizada con éxito') {
       
            if (idProducto === 1) {
                document.getElementById('stock-pan-muerto').innerText = data.nuevoStock;
            } else if (idProducto === 2) {
                document.getElementById('stock-concha').innerText = data.nuevoStock;
            } else if (idProducto === 5) {
                document.getElementById('stock-pan-blanco').innerText = data.nuevoStock;
            } else if (idProducto === 3) {
                document.getElementById('stock-dona').innerText = data.nuevoStock;
            } else if (idProducto === 4) {
                document.getElementById('stock-polvoron').innerText = data.nuevoStock;
            }


            const total = cantidad * precioUnitario;
            totalGeneral += total;

            const tbody = document.getElementById('tabla-registro').getElementsByTagName('tbody')[0];
            const row = tbody.insertRow();
            row.insertCell(0).innerText = `Producto ID ${idProducto}`; 
            row.insertCell(1).innerText = cantidad;
            row.insertCell(2).innerText = precioUnitario;
            row.insertCell(3).innerText = total;

         
            document.getElementById('total-general').innerText = totalGeneral;

            alert(`Compra realizada! Stock restante: ${data.nuevoStock}`);
        } else {
            alert(`${data.message}. Stock actual: ${data.stockActual}`);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al procesar la compra');
    });
}
