import request from "supertest";
import { faker } from "@faker-js/faker";
import app from "../src/app";

describe("Doctors Endpoint", () => {
  let currentDoctor: any = null;

  test("GET /doctors", async () => {
    const response = await request(app).get("/doctors");

    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test("POST /doctors", async () => {
    const doctorData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const response = await request(app)
      .post("/doctors")
      .send(doctorData)
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    currentDoctor = response.body.data;
    expect(response.body.data.firstName).toEqual(doctorData.firstName);
    expect(response.body.data.lastName).toEqual(doctorData.lastName);
  });

  test("GET /doctors/:id", async () => {
    const response = await request(app).get(`/doctors/${currentDoctor.id}`);

    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
  });

  test("PUT /doctors/:id", async () => {
    const updateData = {
      firstName: faker.name.firstName(),
    };

    const response = await request(app)
      .put(`/doctors/${currentDoctor.id}`)
      .send(updateData)
      .set("Accept", "application/json");

    expect(response.status).toEqual(204);
  });

  describe("Test Doctor to Patient Relationship", () => {
    let patient: any = null;

    beforeAll(async () => {
      const patientData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };

      const patientResponse = await request(app)
        .post("/patients")
        .send(patientData);

      patient = patientResponse.body.data;
    });

    test("GET /doctors/:id with patient", async () => {
      const resp1 = await request(app)
        .put(`/doctors/${currentDoctor.id}`)
        .send({ patientId: patient.id });

      expect(resp1.status).toEqual(204);

      const resp2 = await request(app).get(`/doctors/${currentDoctor.id}`);

      expect(resp2.status).toEqual(200);
      expect(resp2.body.success).toBeTruthy();
      expect(resp2.body.data).toHaveProperty("patients");
      expect(resp2.body.data.patients.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("DELETE /doctors/:id", async () => {
    const response = await request(app).delete(`/doctors/${currentDoctor.id}`);

    expect(response.status).toEqual(200);
  });
});
