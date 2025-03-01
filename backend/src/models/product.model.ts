import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El nombre del producto no puede ser nulo ni vacío."
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La descripción del producto no puede ser nula ni vacía."
                }
            }
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isDecimal: {
                    msg: "El precio debe ser un número decimal."
                },
                min: {
                    args: [0.01],
                    msg: "El precio del producto no puede ser cero o menor a cero."
                }
            }
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        createdat: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        updatedat: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'products',
        timestamps: false
    }
);

interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    status: boolean;
    createdat: Date;
    updatedat: Date;
}

export default Product;
