import request from "supertest";

import app from "../src/app";

describe("Server", () => {
  it("Returns basic message at / route", done => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).toEqual("Hello world");
        done();
      });
  });

  it("Multiplies properly", done => {
    request(app)
      .get("/api/multiply?a=5&b=3")
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).toEqual(15);
        done();
      });
  });
});
