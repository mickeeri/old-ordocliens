function ClientRow({ client }) {
  const fullName = `${client.firstName} ${client.lastName}`;
  return (
    <tr>
      <td><a href={Routes.client_path(client.id)}>{fullName}</a></td>
      <td>{client.ssn}</td>
    </tr>);
}

ClientRow.propTypes = {
  client: React.PropTypes.object.isRequired,
};
