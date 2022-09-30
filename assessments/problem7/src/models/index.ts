import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../db/connector";

//Doctor Model
class Doctor extends Model<
  InferAttributes<Doctor>,
  InferCreationAttributes<Doctor>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { sequelize, modelName: "doctors" }
);

//Patient Model
class Patient extends Model<
  InferAttributes<Patient>,
  InferCreationAttributes<Patient>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { sequelize, modelName: "patients" }
);

//Appoinemtment Model
class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare id: CreationOptional<number>;
  declare dateScheduled: Date;
  declare patientId?: ForeignKey<number>;
  declare doctorId?: ForeignKey<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dateScheduled: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { sequelize, modelName: "appointments" }
);

class Doctors_Patients extends Model {
  declare id: CreationOptional<number>;
  declare doctorId: ForeignKey<number>;
  declare patientId: ForeignKey<number>;
}
Doctors_Patients.init(
  {
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Patient,
        key: "patientId",
      },
    },
    doctorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Doctor,
        key: "doctorId",
      },
    },
  },
  { sequelize, timestamps: false }
);

//Relations
Patient.belongsToMany(Doctor, {
  through: Doctors_Patients,
  foreignKey: "patientId",
});
Patient.hasMany(Appointment, {
  foreignKey: "patientId",
});
Doctor.belongsToMany(Patient, {
  through: Doctors_Patients,
  foreignKey: "doctorId",
});
Doctor.hasMany(Appointment, {
  foreignKey: "doctorId",
});
Appointment.belongsTo(Doctor);
Appointment.belongsTo(Patient);

export { Doctor, Patient, Appointment, Doctors_Patients };
