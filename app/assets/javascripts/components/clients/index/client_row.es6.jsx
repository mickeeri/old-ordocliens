function ClientRow({ client }) {
  const fullName = `${client.lastName}, ${client.firstName}`;
  return (
    <tr>
      <td><a href={Routes.client_path(client.id)}>{fullName}</a></td>
      <td>{client.ssn}</td>
      <td>{client.user.first_name} {client.user.last_name}</td>
    </tr>);
}

ClientRow.propTypes = {
  client: React.PropTypes.object.isRequired,
};
