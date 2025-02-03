import request from "supertest";
import app from "./server";
import { expect, test, describe, it } from "vitest";
describe("GET /", () => {
  it("should return status 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ msg: "Hello world" });
  });
});
