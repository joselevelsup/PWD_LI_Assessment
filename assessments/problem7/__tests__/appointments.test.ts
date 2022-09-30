import request from "supertest";
import app from "../src/app";

describe("Appointments Endpoint", () => {
  let patient: any = null;
  let doctor: any = null;
  let currentAppt: any = null;

  beforeAll(async () => {
    const appRequest = request(app);
    const patientResponse = await appRequest.get("/patients/2");
    const doctorResponse = await appRequest.get("/doctors/2");

    patient = patientResponse.body.data;
    doctor = doctorResponse.body.data;
  });

  test("POST /appointments", async () => {
    const appointmentData = {
      doctorId: doctor.id,
      patientId: patient.id,
      dateScheduled: new Date(),
    };

    const response = await request(app)
      .post("/appointments")
      .send(appointmentData)
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    currentAppt = response.body.data;
    expect(response.body.data.doctorId).toEqual(doctor.id);
    expect(response.body.data.patientId).toEqual(patient.id);
  });

  test("GET /appointments", async () => {
    const response = await request(app).get("/appointments");

    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test("GET /appointmeents/:id", async () => {
    const response = await request(app).get(`/appointments/${currentAppt.id}`);

    expect(response.status).toEqual(200);
    console.log(response.body.data);
    expect(response.body.success).toBeTruthy();
  });

  test("PUT /appointment/:id", async () => {
    const updateData = {
      patientId: 3,
    };

    const response = await request(app)
      .put(`/appointments/${currentAppt.id}`)
      .send(updateData)
      .set("Accept", "application/json");

    expect(response.status).toEqual(204);
  });

  test("DELETE /appointments/:id", async () => {
    const response = await request(app).delete(
      `/appointments/${currentAppt.id}`
    );

    expect(response.status).toEqual(200);
  });
});
