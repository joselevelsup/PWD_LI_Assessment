import type { Request, Response } from "express";
import { Router } from "express";
import { Appointment } from "../../models";

type AppointmentData = {
  dateScheduled: Date;
  doctorId: number;
  patientId: number;
};

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const appointments = await Appointment.findAll();

  return res.status(200).json({ success: true, data: appointments });
});

router.get("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const appointmentId = req.params.id;

  const appointment = await Appointment.findOne({
    where: {
      id: appointmentId,
    },
    include: {
      all: true,
    },
  });

  if (appointment) {
    return res.status(200).json({ success: true, data: appointment });
  } else {
    return res.status(404).end();
  }
});

router.post(
  "/",
  async (req: Request<{}, {}, AppointmentData>, res: Response) => {
    const newAppointment = Appointment.build({
      ...req.body,
    });

    try {
      await newAppointment.save();

      return res.status(201).json({ success: true, data: newAppointment });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "failed to save new appointment",
      });
    }
  }
);

router.put(
  "/:id",
  async (req: Request<{ id: number }, {}, AppointmentData>, res: Response) => {
    const appointmentId = req.params.id;

    try {
      const updatedAppointment = await Appointment.update(
        { ...req.body },
        {
          where: {
            id: appointmentId,
          },
        }
      );

      if (updatedAppointment) {
        return res.status(204).send();
      } else {
        return res.status(400).send();
      }
    } catch (e) {
      return res.status(500).json({
        message: "Failed to update the appointment",
      });
    }
  }
);

router.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const appointmentId = req.params.id;

  try {
    await Appointment.destroy({
      where: {
        id: appointmentId,
      },
    });

    return res.status(200).send();
  } catch (e) {
    return res.status(400).send();
  }
});

export { router };
