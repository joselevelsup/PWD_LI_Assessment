import request from "supertest";
import { faker } from "@faker-js/faker";
import app from "../src/app";

describe("Patient Endpoint", () => {
  let currentPatient: any = null;

  test("GET /patients", async () => {
    const response = await request(app).get("/patients");

    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test("POST /patients", async () => {
    const doctorData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const response = await request(app)
      .post("/patients")
      .send(doctorData)
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    currentPatient = response.body.data;
    expect(response.body.data.firstName).toEqual(doctorData.firstName);
    expect(response.body.data.lastName).toEqual(doctorData.lastName);
  });

  test("GET /patients/:id", async () => {
    const response = await request(app).get(`/patients/${currentPatient.id}`);

    expect(response.status).toEqual(200);
    expect(response.body.success).toBeTruthy();
  });

  test("PUT /patients/:id", async () => {
    const updateData = {
      firstName: faker.name.firstName(),
    };

    const response = await request(app)
      .put(`/patients/${currentPatient.id}`)
      .send(updateData)
      .set("Accept", "application/json");

    expect(response.status).toEqual(204);
  });

  describe("Test Patient to Doctor Relationship", () => {
    let doctor: any = null;

    beforeAll(async () => {
      const doctorData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };

      const doctorResponse = await request(app)
        .post("/doctors")
        .send(doctorData);

      doctor = doctorResponse.body.data;
    });

    test("GET /patients/:id with doctors", async () => {
      const resp1 = await request(app)
        .put(`/patients/${currentPatient.id}`)
        .send({ doctorId: doctor.id });

      expect(resp1.status).toEqual(204);

      const resp2 = await request(app).get(`/patients/${currentPatient.id}`);

      expect(resp2.status).toEqual(200);
      expect(resp2.body.success).toBeTruthy();
      expect(resp2.body.data).toHaveProperty("doctors");
      expect(resp2.body.data.doctors.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("DELETE /patients/:id", async () => {
    const response = await request(app).delete(
      `/patients/${currentPatient.id}`
    );

    expect(response.status).toEqual(200);
  });
});
