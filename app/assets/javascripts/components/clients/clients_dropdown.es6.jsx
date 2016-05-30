class ClientsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      selectedClient: '',
      showForm: true,
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
      { client: { lawsuit_id: this.props.lawsuitId } })
      .done(() => {
        this.setState({ showForm: false });
        showAlertInModal(
          'Klient tillagd!',
          '#counterpart-dropdown-alert',
          'alert-success',
          'fa-check');
        setTimeout(() => {
          PubSub.publish('clientListUpdated');
        }, 1000);
      })
      .fail(xhr => {
        showErrorText('Fel uppstod när klient skulle läggas till. Försök igen senare.',
          '#lawsuit-client-dropdown-message');
      });
  }

  dismissBtnClicked(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  fetchClients() {
    const url = Routes.clients_path();
    makeGetRequest(url)
      .success(response => {
        this.setState({ clients: response.clients });
      })
      .error(xhr => {
        showErrorText('Fel uppstod när befintliga klienter skulle hämtas.',
          '#lawsuit-client-dropdown-message');
      });
  }

  render() {
    return (
      <div>
        <div className="alert modal-alert" id="counterpart-dropdown-alert">
          <i className="fa" id="counterpart-dropdown-alert-icon" aria-hidden="true"></i>
          <span id="counterpart-dropdown-alert-span"></span>
        </div>
        {this.state.showForm ?
          <form onSubmit={this.handleOnSubmit}>
            <p className="hidden message" id="lawsuit-client-dropdown-message">
            </p>
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
                  >{client.lastName}, {client.firstName} ({client.personalNumber})</option>
                )}
              </select>
            </div>
            <div className="content-right">
              <button className="btn btn-secondary" onClick={this.dismissBtnClicked}>
                Avbryt
              </button>
              <button className="btn btn-success" type="submit">Spara</button>
            </div>
          </form>
        : ''}
      </div>
    );
  }
}

ClientsDropdown.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
};
