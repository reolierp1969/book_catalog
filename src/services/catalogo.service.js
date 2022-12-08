import http from "../http-common";

class CatalogoDataService {
  getAll() {
    return http.get("/catalogos");
  }

  get(id) {
    return http.get(`/catalogos/${id}`);
  }

  create(data) {
    return http.post("/catalogos", data);
  }

  update(id, data) {
    return http.put(`/catalogos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/catalogos/${id}`);
  }

  deleteAll() {
    return http.delete(`/catalogos`);
  }

  findByTitle(title) {
    return http.get(`/catalogos?title=${title}`);
  }
}

export default new CatalogoDataService();

