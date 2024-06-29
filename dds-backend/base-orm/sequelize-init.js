const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/sistema.db");

// Definición del modelo de Gimnasio
const Gimnasio = sequelize.define(
    "Gimnasio",
    {
        IdGimnasio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido",
                },
                len: {
                    args: [3, 30],
                    msg: "Nombre debe ser entre 3 y 30 caracteres",
                },
            },
        },
        FechaAlta: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Esto asegura que se inicialice en 0 (false)
        }
    },
    {
        hooks: {
            beforeValidate: function (gimnasios, options) {
                if (typeof gimnasios.Nombre === "string") {
                    gimnasios.Nombre = gimnasios.Nombre.toUpperCase().trim();
                }
            },
        },
        timestamps: false,
    }
);

// Definición del modelo de Proveedor
const Proveedor = sequelize.define(
    "Proveedor",
    {
        IdProveedor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Pais: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FechaAltaEmpresa: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Esto asegura que se inicialice en 0 (false)
        },
    },
    
    {
        timestamps: false,
        tableName: "Proveedores"
    }
);

// Definición del modelo de Maquinas
const Maquina = sequelize.define(
    "Maquina",
    {
        IdMaquina: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido",
                },
                len: {
                    args: [5, 60],
                    msg: "Nombre debe ser entre 5 y 60 caracteres",
                },
            },
            unique: {
                args: true,
                msg: "Este nombre ya existe en la tabla!",
            },
        },
        IdGimnasio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Gimnasio,
                key: 'IdGimnasio',
            },
        },
        IdProveedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Proveedor,
                key: 'IdProveedor',
            },
        },
        FechaCreacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ConStock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Esto asegura que se inicialice en 0 (false)
        },
        Eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Esto asegura que se inicialice en 0 (false)
        },
    },
    {
        hooks: {
            beforeValidate: function (maquina, options) {
                if (typeof maquina.Nombre === "string") {
                    maquina.Nombre = maquina.Nombre.toUpperCase().trim();
                }
            },
        },
        timestamps: false,
    }
);

// Definición del modelo de Inscriptos
const Inscripto = sequelize.define(
    "Inscripto",
    {
        IdInscripto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FechaInscripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        IdGimnasio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Gimnasio,
                key: 'IdGimnasio',
            },
        },
        Eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Esto asegura que se inicialice en 0 (false)
        },
    },
    {
        timestamps: false,
    }
);

module.exports = {
    sequelize,
    Gimnasio,
    Proveedor,
    Maquina,
    Inscripto,
};