class ClientsIndex extends React.Component {
  constructor(props) {
    super(props);

    // Initializing state.
    this.state = {
      clients: props.clients,
      meta: props.meta,
      fetchData: {
        search: '',
        page: 1,
        fetchAll: false,
      },
    };

    // Binding functions.
    this.fetchClients = this.fetchClients.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnPaginate = this.handleOnPaginate.bind(this);
    this.handleOnCheckboxChange = this.handleOnCheckboxChange.bind(this);
  }

  fetchClients() {
    const data = this.state.fetchData;

    // Building uri:s with query string parameters.
    const url = data.search
      ? `${Routes.clients_path()}?search=${data.search}&page=1&all=${data.fetchAll}`
      : `${Routes.clients_path()}?page=${data.page}&all=${data.fetchAll}`;

    makeGetRequest(url)
      .success(response => {
        this.setState({ clients: response.clients, meta: response.meta });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  handleOnSearch() {
    this.state.fetchData.search = this.refs.search.value;
    this.fetchClients();
  }

  handleOnPaginate(pageNumber) {
    this.state.fetchData.page = pageNumber;
    this.fetchClients();
  }

  handleOnCheckboxChange(e) {
    this.state.fetchData.fetchAll = e.target.checked;
    this.fetchClients();
  }

  addClientClick() {
    window.location = Routes.new_client_path();
  }

  render() {
    return (
      <div>
        <div className="row index-header">
          <div className="col-md-6">
            <h1>Klientregister</h1>
          </div>
          <div className="col-md-6">
            <form>
              <input
                className="form-control"
                placeholder="Sök på namn eller personnummer"
                autoFocus="true"
                onChange={this.handleOnSearch}
                ref="search"
              />
            </form>
          </div>
        </div>
        <div className="row paginator-row">
          <div className="checkbox col-md-6">
            <label>
              <input
                type="checkbox"
                onChange={this.handleOnCheckboxChange}
              /> Visa alla klienter
            </label>
          </div>
          <div className="col-md-6">
            {this.state.meta.totalPages === 1 ? '' :
              <Paginator
                totalPages={this.state.meta.totalPages}
                currentPage={this.state.meta.currentPage}
                nextPage={this.state.meta.nextPage}
                prevPage={this.state.meta.previousPage}
                onPaginate={this.handleOnPaginate}
              />}
          </div>
        </div>
        <div className="row">
          <table className="table table-bordered col-md-12">
            <thead className="thead-inverse">
              <tr>
                <th>Namn</th>
                <th>Personnummer</th>
                <th>Handläggare</th>
              </tr>
            </thead>
            <tbody>
              {this.state.clients.map(client =>
                <ClientRow key={client.id} client={client} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ClientsIndex.propTypes = {
  clients: React.PropTypes.array.isRequired,
  meta: React.PropTypes.object.isRequired,
};
