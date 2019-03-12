const assert = require("assert");
const expect = require("chai").expect;
const request = require("supertest");
const sinon = require("sinon");
const app = require("../ExpressFunctionApp/app");


describe('GET /api/docs/', () => {

  it('should return 200 status for existing file', () => {
    return request(app)
      .get('/api/docs/swagger.json')
      .then((response) => {
        expect(response.status).to.eql(200)
      })
  });

  it('should return 404 status for non-existing file', () => {
    return request(app)
      .get('/api/docs/doesnexist.json')
      .then((response) => {
        expect(response.status).to.eql(404)
      })
  });

});

describe('POST /api/path-encoding/:text', () => {
  
  it('should return spaces encoded as %20', () => {
    return request(app)
      .post('/api/path-encoding/text%20with%20spaces')
      .set('Content-Type', 'application/json')
      .send({})
      .then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body['path']).to.eql('text%20with%20spaces')
      })
  });

  it('should return spaces encoded as +', () => {
    return request(app)
      .post('/api/path-encoding/text+with+spaces')
      .set('Content-Type', 'application/json')
      .send({})
      .then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body['path']).to.eql('text+with+spaces')
      })
  });

  it('should return encoded special characters', () => {
    return request(app)
      .post("/api/path-encoding/%3A%2F%3F%23%5B%5D%40%21%24%26%27%28%29%2A%2B%2C%3B%3D%25%20")
      .set('Content-Type', 'application/json')
      .send({})
      .then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body['path']).to.eql('%3A%2F%3F%23%5B%5D%40%21%24%26%27%28%29%2A%2B%2C%3B%3D%25%20')
      })
  });

});

describe('POST /api/query-encoding', () => {
  
  it('should return spaces encoded as %20', () => {
    return request(app)
      .post('/api/query-encoding?string_query=text%20with%20spaces')
      .set('Content-Type', 'application/json')
      .send({})
      .then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body['query']).to.eql('text%20with%20spaces')
      })
  });

  it('should return spaces encoded as +', () => {
    return request(app)
      .post('/api/query-encoding?string_query=text+with+spaces')
      .set('Content-Type', 'application/json')
      .send({})
      .then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body['query']).to.eql('text+with+spaces')
      })
  });

  it('should return encoded special characters', () => {
    return request(app)
      .post("/api/query-encoding?string_query=%3A%2F%3F%23%5B%5D%40%21%24%26%27%28%29%2A%2B%2C%3B%3D%25%20")
      .set('Content-Type', 'application/json')
      .send({})
      .then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body['query']).to.eql('%3A%2F%3F%23%5B%5D%40%21%24%26%27%28%29%2A%2B%2C%3B%3D%25%20')
      })
  });

});
