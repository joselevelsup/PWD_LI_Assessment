import type { Request, Response } from "express";
import { Router } from "express";
import { Doctor, Patient, Doctors_Patients } from "../../models";

type DoctorData = {
  firstName: string;
  lastName: string;
  patientId?: number;
};

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const doctors = await Doctor.findAll();

  return res.status(200).json({
    success: true,
    data: doctors,
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findOne({
      where: {
        id: doctorId,
      },
      include: [
        {
          model: Patient,
          as: "patients",
        },
      ],
    });

    if (doctor) {
      return res.status(200).json({
        success: true,
        data: doctor,
      });
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
});

router.post("/", async (req: Request<{}, {}, DoctorData>, res: Response) => {
  const { firstName, lastName, patientId } = req.body;

  try {
    const newDoctor = await Doctor.create({
      firstName,
      lastName,
    });

    if (patientId) {
      await Doctors_Patients.create({
        doctorId: newDoctor.id,
        patientId,
      });
    }

    return res.status(201).json({
      success: true,
      data: newDoctor,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "failed to save new doctor",
    });
  }
});

router.put(
  "/:id",
  async (req: Request<{ id: number }, {}, DoctorData>, res: Response) => {
    const doctorId = req.params.id;
    const { firstName, lastName, patientId } = req.body;

    try {
      await Doctor.update(
        { firstName, lastName },
        {
          where: {
            id: doctorId,
          },
        }
      );

      if (patientId) {
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
      console.log(e);
      return res.status(500).json({
        message: "Failed to update the doctor",
      });
    }
  }
);

router.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const doctorId = req.params.id;

  try {
    const deletedDoctor = await Doctor.destroy({
      where: {
        id: doctorId,
      },
    });

    console.log(deletedDoctor);

    return res.status(200).send();
  } catch (e) {
    return res.status(400).send();
  }
});

export { router };
