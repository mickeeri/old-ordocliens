class LegalCasesIndex extends React.Component {
  render() {
    var legalCaseRows = this.props.legalCases.map(legalCase=>
      <LegalCaseRow key={legalCase.id} legalCase={legalCase} clientId={this.props.clientId }/>
    );

    return (
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Klientens ärenden</h3>
            <small>Klicka för att visa detaljer</small>
          </div>
          <table className="panel-body table table-hover">
            <thead>
              <tr>
                <th>Namn</th>
                <th>Ärende</th>
                <th>Aktivt</th>
              </tr>
            </thead>
            <tbody>
              {legalCaseRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

LegalCasesIndex.propTypes = {
  legalCases: React.PropTypes.array.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
