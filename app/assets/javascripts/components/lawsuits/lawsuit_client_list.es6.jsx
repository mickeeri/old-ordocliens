class LawsuitClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clients: props.clients };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('clientListUpdated', this.refreshClients.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe('clientListUpdated');
  }

  handleDeleteClick(clientId) {
    const url = `${Routes.client_path(clientId)}?lawsuit_id=${this.props.lawsuitId}`;
    makeDeleteRequest(url)
      .success(() => {
        showSuccessText('Klient raderad från ärende', '#lawsuit-client-list-message');
        this.refreshClients();
      })
      .fail(xhr => {
        showErrorText('Något gick fel när klient skulle raderas från ärende',
          '#lawsuit-client-list-message');
      });
  }

  refreshClients() {
    const url = `/lawsuits/${this.props.lawsuitId}/clients`;
    makeGetRequest(url)
      .success(res => {
        this.setState({ clients: res.clients });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        const alert = $('#lawsuit-client-list-message');
        alert.text('Problem när klienter skulle uppdateras.');
        alert.addClass('text-danger');
        alert.slideDown(300);
      });
  }

  render() {
    return (
      <div className="card card-block">
        <p className="hidden message" id="lawsuit-client-list-message">
        </p>
        <h3 className="card-title">{this.props.clients.length > 1 ? 'Klienter' : 'Klient'}</h3>
        <ul className="show-page-list">
          {this.state.clients.map(client =>
            <li key={client.id}>
              <a href={Routes.client_path(client.id)}>
                {client.firstName} {client.lastName} ({client.ssn})
              </a>
              <span className="text-muted">{client.id === this.props.primaryClientId ? ' huvudklient' : ''}</span>
              {client.id !== this.props.primaryClientId ?
                <i
                  className="fa fa-times delete-row-icon"
                  onClick={() => this.handleDeleteClick(client.id)}
                  aria-hidden="true"
                />
              : ''}
            </li>
          )}
        </ul>
        <div id="editModalContainer"></div>
        <div className="content-right">
          <AddClientButton
            addNewClient={false}
            lawsuitId={this.props.lawsuitId}
          />
          <AddClientButton
            addNewClient
            lawsuitId={this.props.lawsuitId}
          />
        </div>
      </div>
    );
  }
}

LawsuitClientList.propTypes = {
  clients: React.PropTypes.array,
  lawsuitId: React.PropTypes.number.isRequired,
};
