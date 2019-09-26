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

  it("Adds properly", done => {
    request(app)
      .get("/api/add?a=5&b=3")
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).toEqual(8);
        done();
      });
  });

  it("Divides properly", done => {
    request(app)
      .get("/api/divide?a=6&b=3")
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).toEqual(2);
        done();
      });
  });

  it("Divides by zero properly", done => {
    request(app)
      .get("/api/divide?a=6&b=0")
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).toEqual(null);
        done();
      });
  });
});
