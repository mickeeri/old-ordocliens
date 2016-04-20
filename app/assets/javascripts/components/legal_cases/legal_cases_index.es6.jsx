class LegalCasesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      legalCases: props.legalCases,
    };

    // this.toggleEditMode = this.toggleEditMode.bind(this);

  }

  render() {
    var legalCaseRows = this.state.legalCases.map(legalCase=>
      <LegalCaseRow key={legalCase.id} legalCase={legalCase} />
    );

    return (
      <div className="row">
        <div className="col-md-9">
          <div className="panel panel-default">
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
      </div>
    );
  }
}

class LegalCaseRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOnTableRow = this.handleClickOnTableRow.bind(this);
  }

  handleClickOnTableRow(e) {
    window.location = Routes.legal_case_path(this.props.legalCase.id);
  }

  render() {
    var legalCase = this.props.legalCase;
    var active = legalCase.active ? 'Ja' : 'Nej';
    return (
      <tr onClick={this.handleClickOnTableRow}>
        <td>{legalCase.name}</td>
        <td>{legalCase.id}</td>
        <td>{active}</td>
      </tr>
    );
  }
}

LegalCaseRow.propTypes = {
  legalCase: React.PropTypes.object.isRequired,
};
