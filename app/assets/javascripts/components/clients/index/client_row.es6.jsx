/* global React */
/* global Routes */

function ClientRow({ client }) {
  const fullName = `${client.first_name} ${client.last_name}`;
  return (
    <tr>
      <td>{client.id}</td>
      <td><a href={Routes.client_path(client.id)}>{fullName}</a></td>
      <td>{client.ssn}</td>
    </tr>);
}

ClientRow.propTypes = {
  client: React.PropTypes.object.isRequired,
};
