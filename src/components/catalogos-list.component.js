import React, { Component } from "react";
import CatalogoDataService from "../services/catalogo.service";
import { Link } from "react-router-dom";



export default class CatalogosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCatalogos = this.retrieveCatalogos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCatalogo = this.setActiveCatalogo.bind(this);
    this.removeAllCatalogos = this.removeAllCatalogos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      catalogos: [],
      currentCatalogo: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveCatalogos();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCatalogos() {
    CatalogoDataService.getAll()
      .then(response => {
        this.setState({
          catalogos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCatalogos();
    this.setState({
      currentCatalogo: null,
      currentIndex: -1
    });
  }

  setActiveCatalogo(catalogo, index) {
    this.setState({
      currentCatalogo: catalogo,
      currentIndex: index
    });
  }

  removeAllCatalogos() {
    CatalogoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentCatalogo: null,
      currentIndex: -1
    });

    CatalogoDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          catalogos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, catalogos, currentCatalogo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Listado de libros</h4>

          <ul className="list-group">
            {catalogos &&
              catalogos.map((catalogo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCatalogo(catalogo, index)}
                  key={index}
                >
                  {catalogo.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCatalogos}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCatalogo ? (
            <div>
              <h4>Libro</h4>
              <div>
                <label>
                  <strong>Isbn:</strong>
                </label>{" "}
                {currentCatalogo.isbn}
              </div>
              <div>
                <label>
                  <strong>Gender:</strong>
                </label>{" "}
                {currentCatalogo.gender}
              </div>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentCatalogo.title}
              </div>
              <div>
                <label>
                  <strong>Author:</strong>
                </label>{" "}
                {currentCatalogo.author}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCatalogo.description}
              </div>
              <div>
                <label>
                  <strong>Editorial:</strong>
                </label>{" "}
                {currentCatalogo.editorial}
              </div>
              <div>
                <label>
                  <strong>Year:</strong>
                </label>{" "}
                {currentCatalogo.year}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCatalogo.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/catalogos/" + currentCatalogo.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Haga click sobre un libro...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
