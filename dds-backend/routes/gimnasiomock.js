const express = require('express');
const router = express.Router();

let arr_GimnasioMock = [
    {
        "IdGimnasio": 1,
        "Nombre": "Gol center",
        "FechaAlta": "2019-11-30"
    },
    {
        "IdGimnasio": 2,
        "Nombre": "Genesis",
        "FechaAlta": "2014-02-05"
    },
    {
        "IdGimnasio": 3,
        "Nombre": "Africa",
        "FechaAlta": "2011-06-17"
    },
    {
        "IdGimnasio": 4,
        "Nombre": "SportClub",
        "FechaAlta": "2022-09-26"
    },
    {
        "IdGimnasio": 5,
        "Nombre": "La huertilla",
        "FechaAlta": "2024-01-13"
    },
    {
        "IdGimnasio": 6,
        "Nombre": "Benefit",
        "FechaAlta": "2023-05-09"
    },
    {
        "IdGimnasio": 7,
        "Nombre": "Animal",
        "FechaAlta": "2010-11-21"
    },
];

router.get('/api/gimnasiomock', async function (req, res) {
    res.json(arr_GimnasioMock);
});

router.get('/api/gimnasiomock/:id', async function (req, res) {
    let gimnasio = arr_GimnasioMock.find(
        (x) => x.IdGimnasio == req.params.id
    );
    if (gimnasio) res.json(gimnasio);
    else res.status(404).json({ message: 'Gimnasio no encontrado' });
});

router.post('/api/gimnasiomock/', (req, res) => {
    const { Nombre } = req.body;
    let gimnasio = {
        Nombre,
        IdGimnasio: Math.floor(Math.random() * 100000),
        FechaAlta: new Date().toISOString()
    };

    // aqui agregar a la coleccion
    arr_GimnasioMock.push(gimnasio);

    res.status(201).json(gimnasio);
});

router.put('/api/gimnasiomock/:id', (req, res) => {
    let gimnasio = arr_GimnasioMock.find(
        (x) => x.IdGimnasio == req.params.id
    );

    if (gimnasio) {
        const { Nombre, FechaAlta } = req.body;
        gimnasio.Nombre = Nombre;
        gimnasio.FechaAlta = FechaAlta;
        res.json({ message: 'Gimnasio actualizado' });
    } else {
        res.status(404).json({ message: 'Gimnasio no encontrado' })
    }
});

router.delete('/api/gimnasiomock/:id', (req, res) => {
    let gimnasio = arr_GimnasioMock.find(
        (x) => x.IdGimnasio == req.params.id
    );

    if (gimnasio) {
        arr_GimnasioMock = arr_GimnasioMock.filter(
            (x) => x.IdGimnasio != req.params.id
        );
        res.json({ message: 'gimnasio eliminado' });
    } else {
        res.status(404).json({ message: 'gimnasio no encontrado' })
    }
});


module.exports = router;
