class ClientRow extends React.Component {
  displayName: 'ClientRow';
  render() {
    var client = this.props.client;
    var clientPath = 'clients/' + client.id;
    return (
      <tr>
        <td>{client.first_name}</td>
        <td>{client.last_name}</td>
        <td>{client.ssn}</td>
        <td className="np"><a href={clientPath}>Mer info</a></td>
      </tr>
    );
  }
}
