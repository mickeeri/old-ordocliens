class ClientRow extends React.Component {
  render() {
    var client = this.props.client;
    var clientPath = 'clients/' + client.id;
    var fullName = client.first_name + ' ' + client.last_name;
    return (
      <tr>
        <td>{client.id}</td>
        <td><a href={Routes.client_path(client.id)}>{fullName}</a></td>
        <td>{client.ssn}</td>
      </tr>
    );
  }
}

ClientRow.propTypes = {
  client: React.PropTypes.object.isRequired,
};
