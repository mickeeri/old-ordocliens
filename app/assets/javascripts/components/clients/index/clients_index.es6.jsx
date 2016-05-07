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
      },
    };

    // Binding functions.
    this.fetchClients = this.fetchClients.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnPaginate = this.handleOnPaginate.bind(this);
  }

  fetchClients() {
    const data = this.state.fetchData;

    // Building uri:s with query string parameters.
    const url = data.search ? `${Routes.clients_path()}?search=${data.search}` :
      `${Routes.clients_path()}?page=${data.page}`;

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

  addClientClick() {
    window.location = Routes.new_client_path();
  }

  render() {
    // Table rows with clients.
    let clientRows = this.state.clients.map(client =>
      <ClientRow key={client.id} client={client} />);

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h1>Klientregister</h1>
          </div>
          <div className="col-md-8">
            <form>
              <input
                className="form-control"
                placeholder="Sök på namn eller personnummer"
                autoFocus="true"
                onChange={this.handleOnSearch}
                ref="search"
              />
            {this.state.meta.total_pages === 1 ? '' :
              <Paginator
                totalPages={this.state.meta.totalPages}
                currentPage={this.state.meta.currentPage}
                nextPage={this.state.meta.nextPage}
                prevPage={this.state.meta.previousPage}
                onPaginate={this.handleOnPaginate}
              />
             }
            </form>
          </div>
        </div>
        <div className="row">
          <table className="table table-bordered table-striped col-md-12">
            <thead>
              <tr>
                <th>Klientnummer</th>
                <th>Namn</th>
                <th>Personnummer</th>
              </tr>
            </thead>
            <tbody>
              {clientRows}
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
