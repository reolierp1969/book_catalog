import React, { Component } from "react";
import CatalogoDataService from "../services/catalogo.service";
import { withRouter } from '../common/with-router';

class Catalogo extends Component {
  constructor(props) {
    super(props);
    this.onChangeIsbn = this.onChangeIsbn.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEditorial = this.onChangeEditorial.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.getCatalogo = this.getCatalogo.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCatalogo = this.updateCatalogo.bind(this);
    this.deleteCatalogo = this.deleteCatalogo.bind(this);

    this.state = {
      currentCatalogo: {
        id: null,
        isbn: "",
        gender: "",
        title: "",
        author: "",
        description: "",
        editorial: "",
        year:"", 
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCatalogo(this.props.router.params.id);
  }

  onChangeIsbn(e) {
    const isbn = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCatalogo: {
          ...prevState.currentCatalogo,
          isbn: isbn
        }
      };
    });
  }

  onChangeGender(e) {
    const gender = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCatalogo: {
          ...prevState.currentCatalogo,
          gender: gender
        }
      };
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCatalogo: {
          ...prevState.currentCatalogo,
          title: title
        }
      };
    });
  }

  onChangeAuthor(e) {
    const author = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCatalogo: {
          ...prevState.currentCatalogo,
          author: author
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCatalogo: {
        ...prevState.currentCatalogo,
        description: description
      }
    }));
  }

  onChangeEditorial(e) {
    const editorial = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCatalogo: {
          ...prevState.currentCatalogo,
          editorial: editorial
        }
      };
    });
  }

  onChangeYear(e) {
    const year = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCatalogo: {
          ...prevState.currentCatalogo,
          year: year
        }
      };
    });
  }

  getCatalogo(id) {
    CatalogoDataService.get(id)
      .then(response => {
        this.setState({
          currentCatalogo: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      isbn: this.state.currentTutorial.isbn,
      gender: this.state.currentTutorial.gender,
      title: this.state.currentTutorial.title,
      author: this.state.currentTutorial.author,
      description: this.state.currentTutorial.description,
      editorial: this.state.currentTutorial.editorial,
      year: this.state.currentTutorial.year,
      published: status
    };

    CatalogoDataService.update(this.state.currentCatalogo.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCatalogo: {
            ...prevState.currentCatalogo,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCatalogo() {
    CatalogoDataService.update(
      this.state.currentCatalogo.id,
      this.state.currentCatalogo
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "El libro fue actualizado satisfactoriamente!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCatalogo() {    
    CatalogoDataService.delete(this.state.currentCatalogo.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/catalogos');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCatalogo } = this.state;

    return (
      <div>
        {currentCatalogo ? (
          <div className="edit-form">
            <h4>Libro</h4>
            <form>
            <div className="form-group">
                <label htmlFor="isbn">Isbn</label>
                <input
                  type="text"
                  className="form-control"
                  id="isbn"
                  value={currentCatalogo.isbn}
                  onChange={this.onChangeIsbn}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  value={currentCatalogo.gender}
                  onChange={this.onChangeGender}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCatalogo.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="authot"
                  value={currentCatalogo.author}
                  onChange={this.onChangeAuthor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCatalogo.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editorial">Editorial</label>
                <input
                  type="text"
                  className="form-control"
                  id="editorial"
                  value={currentCatalogo.editorial}
                  onChange={this.onChangeEditorial}
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="year"
                  value={currentCatalogo.year}
                  onChange={this.onChangeYear}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCatalogo.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCatalogo.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCatalogo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCatalogo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Haga click sobre un libro...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Catalogo);