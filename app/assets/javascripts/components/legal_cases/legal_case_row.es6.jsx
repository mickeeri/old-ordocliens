class LegalCaseRow extends React.Component {
  handleClickOnTableRow(e) {
    window.location = Routes.client_legal_case_path(this.props.clientId, this.props.legalCase.id);
  }

  render() {
    var legalCase = this.props.legalCase;
    var active = legalCase.active ? 'Ja' : 'Nej';
    return (
      <div className="card" onClick={this.handleClickOnTableRow.bind(this)}>
        <div className="card-block lc-card">
          <p><strong>Domstol: </strong>{legalCase.name}</p>
          <p><strong>Målnummer: </strong>{legalCase.id}</p>
          <p><strong>Uppdrag: </strong>Lorem ipsum</p>
          <p><strong>Aktivt: </strong>{active}</p>
        </div>
      </div>
    );
  }
}

LegalCaseRow.propTypes = {
  legalCase: React.PropTypes.object.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
