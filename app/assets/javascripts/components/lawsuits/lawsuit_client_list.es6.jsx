class LawsuitClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clients: props.clients };
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
      </div>
    );
  }
}

LawsuitClientList.propTypes = {
  clients: React.PropTypes.array,
};
