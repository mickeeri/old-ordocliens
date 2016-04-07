class ClientsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
    this.fetchClients = this.fetchClients.bind(this);
    this.makeSearch = this.makeSearch.bind(this);

  }

  componentDidMount() {
    this.fetchClients();
  }

  fetchClients() {
    get('/clients')
    .then(json=>{

      this.setState({clients: json.clients});
    });
  }

  makeSearch() {
    get(`/clients?search=${this.refs.search.value}`)
    .then(json=>{
      console.log(json.clients);
      this.setState({clients: json.clients});
    });
  }

  render() {
    // Table rows with clients.
    var clientRows = this.state.clients.map(client=>{
      return <ClientRow key={client.id} client={client} />
    });

    return (
      <div className="panel panel-default table-panel">
        <div className="panel-heading">
          <form>
            <input
              className="form-control"
              placeholder="Sök på klient"
              autofocus="true"
              onChange={this.makeSearch}
              ref="search"
            />
          </form>
        </div>
        <table className="panel-body table table-bordered table-striped">
          <thead>
            <tr>
              <th>Förnamn</th>
              <th>Efternamn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientRows}
          </tbody>
        </table>
      </div>
    );
  }
}
