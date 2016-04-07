class ClientsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questions, user, nextPage} = this.props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    // get(`/clients?query=${this.refs.search.value}`);
    //   .then(json=>{
    //     console.log(json);
    //   });

    get(`/clients?query=${this.refs.search.value}`)
      .then(json=>{
        console.log(json);
        this.setState({clients: json.clients});
      });
  }

  handleOnChange(e) {
    get(`/clients?query=${this.refs.search.value}`)
      .then(json=>{
        console.log(json);
        this.setState({clients: json.clients});
      });
  }

  nextPage() {
    if (this.state.nextPage) {
      get(`/clients?page=${this.state.nextPage}`)
        .then(json=>{
          console.log(json);
          this.setState(json);
        });
    }
  }

  changePage(e){
    console.log(e);
  }

  render() {
    var clients = this.state.clients;

    return (
      <div className="row panel panel-default table-panel">
        <div className="panel-heading">
          <form className="inline-form">
            <input
              type="text"
              className="form-control"
              placeholder="Sök"
              autofocus="true"
              onChange={this.handleOnChange}
              ref="search"
            />
          </form>
        </div>
        <table className="panel-body table table-striped">
          <thead>
            <tr>
              <th>Förnamn</th>
              <th>Efternamn</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(function(client){
              return (
                <tr key={client.id}>
                  <td>{client.first_name}</td>
                  <td>{client.last_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Visar {this.state.perPage} av {this.state.totalEntries}, sida {this.state.currentPage} av {this.state.totalPages}</p>
        <a className="btn btn-default"
          onClick={this.changePage}
          ref="previousPageButton"
        >

        </a>
        <a className="btn btn-default"
          onClick={this.nextPage}
          >Nästa
        </a>
      </div>
    );
  }
}
