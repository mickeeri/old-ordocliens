class LawsuitClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clients: props.clients };
  }

  componentDidMount() {
    PubSub.subscribe('clientListUpdated', this.refreshClients.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe('clientListUpdated');
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
