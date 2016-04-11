class ClientsIndex extends React.Component {
  constructor(props) {
    super(props);

    // Initializing state.
    this.state = {
      clients: props.data.clients,
      meta: props.data.meta,
      fetchData: {
        search: '',
        page: 1
      }
    };

    // Binding functions.
    this.fetchClients = this.fetchClients.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnPaginate = this.handleOnPaginate.bind(this);
  }

  componentDidMount() {
    console.log("mount index");
  }

  componentWillUnmount() {
    console.log("unmounting index");
  }

  fetchClients() {
    var endpoint;
    var data = this.state.fetchData;

    // Building uri:s with query string parameters.
    if (data.search) {
      endpoint = '/clients?search='+data.search;
    } else {
      endpoint = '/clients?page='+data.page;
    }

    // Calling get method in utils.
    get(endpoint, data.page)
    .then(json=>{
      // Updating state with new data.
      this.setState({clients: json.clients, meta: json.meta});
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

  render() {
    // Table rows with clients.
    var clientRows = this.state.clients.map(client=>{
      return <ClientRow key={client.id} client={client} />
    });

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
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
        <table className="panel-body table table-bordered table-striped clients-table">
          <thead>
            <tr>
              <th>Förnamn</th>
              <th>Efternamn</th>
              <th>Personnummer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientRows}
          </tbody>
        </table>
        <div className="panel-footer">
          <ClientPagination totalPages={this.state.meta.totalPages} currentPage={this.state.meta.currentPage} onPaginate={this.handleOnPaginate} />
        </div>
      </div>
    );
  }
}
