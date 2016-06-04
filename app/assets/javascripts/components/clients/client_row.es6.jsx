function ClientRow({ client }) {
  const fullName = `${client.lastName}, ${client.firstName}`;
  return (
    <tr>
      <td><a href={Routes.client_path(client.id)}>{fullName}</a></td>
      <td>{client.personalNumber}</td>
      <td>{client.user.fullName}</td>
    </tr>);
}

ClientRow.propTypes = {
  client: React.PropTypes.object.isRequired,
};
