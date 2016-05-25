function LawsuitIndexRow({ lawsuit }) {
  function handleOnRowClick(lawsuitId) {
    window.location = Routes.lawsuit_path(lawsuitId);
  }
  const date = new Date(lawsuit.createdAt).yyyymmdd();
  return (
    <tr onClick={() => handleOnRowClick(lawsuit.id)} >
      <td>{lawsuit.primaryClient}</td>
      <td>{lawsuit.lawsuitType.name}</td>
      <td>{lawsuit.slug}</td>
      <td>{date}</td>
      <td
        className={lawsuit.closed ? 'text-danger' : 'text-success'}
      >{lawsuit.closed ? 'Arkiverat' : 'Aktivt'}</td>
    </tr>);
}

LawsuitIndexRow.propTypes = {
  lawsuit: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    lawsuitType: React.PropTypes.object.isRequired,
    slug: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.string.isRequired,
    closed: React.PropTypes.bool.isRequired,
    primaryClient: React.PropTypes.string.isRequired,
  }),
};
