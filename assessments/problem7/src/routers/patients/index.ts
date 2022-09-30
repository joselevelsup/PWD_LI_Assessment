import type { Request, Response } from "express";
import { Router } from "express";
import { Doctor, Doctors_Patients, Patient } from "../../models";

type PatientData = {
  firstName: string;
  lastName: string;
  doctorId?: number;
};

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const patients = await Patient.findAll();

  return res.status(200).json({ success: true, data: patients });
});

router.get("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const patientId = req.params.id;

  const patient = await Patient.findOne({
    where: {
      id: patientId,
    },
    include: [
      {
        model: Doctor,
        as: "doctors",
      },
    ],
  });

  if (patient) {
    return res.status(200).json({
      success: true,
      data: patient,
    });
  } else {
    return res.status(404).send();
  }
});

router.post("/", async (req: Request<{}, {}, PatientData>, res: Response) => {
  const { firstName, lastName, doctorId } = req.body;
  try {
    const newPatient = await Patient.create({
      firstName,
      lastName,
    });

    if (doctorId) {
      await Doctors_Patients.create({
        doctorId,
        patientId: newPatient.id,
      });
    }

    return res.status(201).json({ success: true, data: newPatient });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "failed to save new patient",
    });
  }
});

router.put(
  "/:id",
  async (req: Request<{ id: number }, {}, PatientData>, res: Response) => {
    const patientId = req.params.id;
    const { firstName, lastName, doctorId } = req.body;

    try {
      await Patient.update(
        { firstName, lastName },
        {
          where: {
            id: patientId,
          },
        }
      );

      if (doctorId) {
        const doesRelationAlreadyExist = await Doctors_Patients.findOne({
          where: {
            doctorId,
            patientId,
          },
        });

        if (!doesRelationAlreadyExist) {
          await Doctors_Patients.create({
            doctorId,
            patientId,
          });
        }
      }

      return res.status(204).send();
    } catch (e) {
      return res.status(500).json({
        message: "Failed to update the paitent",
      });
    }
  }
);

router.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const patientId = req.params.id;

  try {
    const deletedPatient = await Patient.destroy({
      where: {
        id: patientId,
      },
    });

    console.log(deletedPatient);

    return res.status(200).send();
  } catch (e) {
    return res.status(400).send();
  }
});

export { router };
