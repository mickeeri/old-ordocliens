class LegalCaseInfo extends React.Component {
  render() {
    var legalCase = this.props.legal_case;
    var active = legalCase.active ? 'Ja' : 'Nej';
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Ärende nr {legalCase.id}</h3>
        </div>
        <div className="panel-body">
          <h4>Ärendets namn</h4>
          {legalCase.name}
          <hr/>
          <h4>E-post</h4>
          {active}
        </div>
      </div>
    );
  }
}
