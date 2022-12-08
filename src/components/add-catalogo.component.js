import React, { Component } from "react";
import CatalogoDataService from "../services/catalogo.service";

export default class AddCatalogo extends Component {
  constructor(props) {
    super(props);
    this.onChangeIsbn = this.onChangeIsbn.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEditorial = this.onChangeEditorial.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.saveCatalogo = this.saveCatalogo.bind(this);
    this.newCatalogo = this.newCatalogo.bind(this);

    this.state = {
      id: null,
      isbn: "",
      gender: "",
      title: "",
      author: "",
      description: "",
      editorial: "",
      year:"", 
      published: false,

      submitted: false
    };
  }

  onChangeIsbn(e) {
    this.setState({
      isbn: e.target.value
    });
  }


  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }
  
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }


  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }


  onChangeEditorial(e) {
    this.setState({
      editorial: e.target.value
    });
  }


  onChangeYear(e) {
    this.setState({
      year: e.target.value
    });
  }

  saveCatalogo() {
    var data = {
      isbn: this.state.isbn,
      gender: this.state.gender,
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      editorial: this.state.editorial,
      year: this.state.year
    };

    CatalogoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          isbn: response.data.isbn,
          gender: response.data.gender,
          title: response.data.title,
          author: response.data.author,
          description: response.data.description,
          editorial: response.data.editorial,
          year: response.data.year,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCatalogo() {
    this.setState({
      id: null,
      isbn: "",
      gender: "",
      title: "",
      author: "",
      description: "",
      editorial: "",
      year: "", 
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Su envio ha sido muy exitoso!</h4>
            <button className="btn btn-success" onClick={this.newCatalogo}>
              Add
            </button>
          </div>
        ) : (
          <div>
         
           <div className="form-group">
              <label htmlFor="isbn">Isbn</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                required
                value={this.state.isbn}
                onChange={this.onChangeIsbn}
                name="isbn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                required
                value={this.state.gender}
                onChange={this.onChangeGender}
                name="gender"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.onChangeAuthor}
                name="author"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="editorial">Editorial</label>
              <input
                type="text"
                className="form-control"
                id="editorial"
                required
                value={this.state.editorial}
                onChange={this.onChangeEditorial}
                name="editorial"
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                className="form-control"
                id="year"
                required
                value={this.state.year}
                onChange={this.onChangeYear}
                name="year"
              />
            </div>

            <button onClick={this.saveCatalogo} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
