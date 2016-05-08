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
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div className="card card-block">
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
