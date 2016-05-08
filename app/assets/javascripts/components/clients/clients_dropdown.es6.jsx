class ClientsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      selectedClient: '',
    };
    this.fetchClients = this.fetchClients.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchClients();
  }

  handleSelectChange(e) {
    this.setState({ selectedClient: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    makePutRequest(Routes.client_path(this.state.selectedClient),
      { client: { lawsuit_id: this.props.lawsuitId } }, 'clientListUpdated');
  }

  dismissBtnClicked() {
    PubSub.publish('dismissEdit');
  }

  fetchClients() {
    const url = Routes.clients_path();
    makeGetRequest(url)
      .success(response => {
        this.setState({ clients: response.clients });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="clients"></label>
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.handleSelectChange}
              name="clients"
              value={this.state.selectedClient}
              required
            >
              <option value="" disabled>Välj en klient</option>
              {this.state.clients.map(client =>
                <option
                  key={client.id}
                  value={client.id}
                >{client.lastName}, {client.firstName} ({client.ssn})</option>
              )}
            </select>
          </div>
          <div className="content-right">
            <button className="btn btn-secondary btn-sm" onClick={this.dismissBtnClicked}>
              Avbryt
            </button>
            <button className="btn btn-success btn-sm" type="submit">Spara</button>
          </div>
        </form>
      </div>
    );
  }
}

ClientsDropdown.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
};
