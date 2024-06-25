const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/sistema.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
    );
    console.log("tabla usuarios creada!");
    await db.run(
      "insert into usuarios values (1,'admin','123','admin'),(2,'juan','123','member');"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'gimnasios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table gimnasios( IdGimnasio INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, FechaAlta text);"
    );
    console.log("tabla gimnasio creada!");
    await db.run(
      `insert into gimnasios values (1,'Gol center', '2019-11-30'),
      (2,'Genesis', '2014-02-05'),
      (3,'Africa', '2011-06-17'),
      (4,'SportClub', '2022-09-26'),
      (5,'La huertilla', '2024-01-13'),
      (6,'Benefit', '2023-05-09'),
      (7,'Animal', '2010-11-21'),
      (8, 'Mamanna', '2008-05-12'),
      (9, 'Megatlon', '2001-06-23'),
      (10, 'Manantial', '2007-02-21');`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'proveedor'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table proveedor(
        IdProveedor INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre text NOT NULL,
        Pais text NOT NULL,
        Telefono text NOT NULL,
        FechaAltaEmpresa text
      );`
    );
    console.log("tabla proveedor creada!");

    await db.run(
      `insert into proveedor (Nombre, Pais, Telefono, FechaAltaEmpresa) values
      ('FitnessPro', 'Argentina', '123456789', '2010-01-01'),
      ('GymTech', 'Brasil', '987654321', '2012-05-15'),
      ('StrongFit', 'Chile', '555666777', '2015-09-30'),
      ('PowerEquip', 'Peru', '444555666', '2018-07-12'),
      ('MuscleMax', 'Colombia', '777888999', '2019-03-25'),
      ('IronWorks', 'Uruguay', '333222111', '2017-11-05'),
      ('FlexGym', 'Paraguay', '111222333', '2016-08-20'),
      ('TitanFitness', 'Bolivia', '222333444', '2014-04-10'),
      ('PrimeHealth', 'Venezuela', '555444333', '2020-01-22'),
      ('EliteFitness', 'Ecuador', '666555444', '2013-06-30');`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'maquinas' ";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table maquinas( 
        IdMaquina INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre text NOT NULL UNIQUE,
        Gimnasio INTEGER,
        Proveedor INTEGER,
        FechaCreacion text,
        FOREIGN KEY (Gimnasio) REFERENCES gimnasios(IdGimnasio),
        FOREIGN KEY (Proveedor) REFERENCES proveedor(IdProveedor)
      );`
    );
    console.log("tabla maquinas creada!");

    await db.run(
      `insert into maquinas (Nombre, Gimnasio, Proveedor, FechaCreacion) values
      ('Banco pecho plano', 1, 1, '2023-01-19'),
      ('Máquina de sentadillas', 2, 2, '2023-02-10'),
      ('Bicicleta estática', 3, 3, '2023-03-15'),
      ('Máquina de remo', 4, 4, '2023-04-22'),
      ('Máquina de press de piernas', 5, 5, '2023-05-05'),
      ('Máquina de dominadas asistidas', 6, 6, '2023-06-17'),
      ('Cinta de correr', 7, 7, '2023-07-09'),
      ('Máquina de prensa de hombros', 1, 8, '2023-08-01'),
      ('Máquina de extensión de piernas', 2, 9, '2023-08-15'),
      ('Máquina de curl de piernas', 3, 10, '2023-09-05'),
      ('Máquina de abductores', 4, 1, '2023-09-20'),
      ('Máquina de aductores', 5, 2, '2023-10-10'),
      ('Máquina de press inclinado', 6, 3, '2023-10-25'),
      ('Máquina de elevación de pantorrillas', 7, 4, '2023-11-10'),
      ('Máquina de triceps', 1, 5, '2023-11-20'),
      ('Máquina de biceps', 2, 6, '2023-12-01'),
      ('Máquina de crunch abdominal', 3, 7, '2023-12-15'),
      ('Máquina de pectoral contractor', 4, 8, '2024-01-01'),
      ('Máquina de glúteos', 5, 9, '2024-01-10'),
      ('Máquina de dorsales', 6, 10, '2024-01-25'),
      ('Máquina de press de hombros', 7, 1, '2024-02-10'),
      ('Máquina de remo sentado', 1, 2, '2024-02-25'),
      ('Máquina de press de pecho', 2, 3, '2024-03-10'),
      ('Máquina de press de pierna horizontal', 3, 4, '2024-03-25'),
      ('Máquina de hiperextensión', 4, 5, '2024-04-05'),
      ('Máquina de elevación lateral', 5, 6, '2024-04-20'),
      ('Máquina de crunch oblicuo', 6, 7, '2024-05-05');`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'inscriptos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table inscriptos(
        IdInscripto INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre text NOT NULL,
        FechaInscripcion text NOT NULL,
        Gimnasio INTEGER,
        FOREIGN KEY (Gimnasio) REFERENCES gimnasios(IdGimnasio)
      );`
    );
    console.log("tabla inscriptos creada!");

    await db.run(
      `insert into inscriptos (Nombre, FechaInscripcion, Gimnasio) values
      ('Carlos Perez', '2023-01-10', 1),
      ('Lucia Martinez', '2023-01-15', 2),
      ('Jose Gomez', '2023-02-10', 3),
      ('Mariana Rodriguez', '2023-03-05', 4),
      ('Pedro Fernandez', '2023-03-15', 5),
      ('Ana Lopez', '2023-04-10', 6),
      ('Juan Torres', '2023-05-01', 7),
      ('Laura Sanchez', '2023-05-20', 8),
      ('Santiago Ramirez', '2023-06-10', 9),
      ('Valeria Gomez', '2023-07-05', 10);`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
