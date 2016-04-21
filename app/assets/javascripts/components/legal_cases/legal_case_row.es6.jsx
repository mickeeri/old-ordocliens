class LegalCaseRow extends React.Component {
  handleClickOnTableRow(e) {
    window.location = Routes.client_legal_case_path(this.props.clientId, this.props.legalCase.id);
  }

  render() {
    var legalCase = this.props.legalCase;
    var active = legalCase.active ? 'Ja' : 'Nej';
    return (
      <tr onClick={this.handleClickOnTableRow.bind(this)}>
        <td>{legalCase.name}</td>
        <td>{legalCase.id}</td>
        <td>{active}</td>
      </tr>
    );
  }
}

LegalCaseRow.propTypes = {
  legalCase: React.PropTypes.object.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
