class LegalCaseInfo extends React.Component {
  render() {
    var legalCase = this.props.legal_case;
    var active = legalCase.active ? 'Ja' : 'Nej';
    var created = new Date(legalCase.created_at);
    var updated = new Date(legalCase.updated_at);
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Ärende nr {legalCase.id}</h3>
        </div>
        <div className="panel-body">
          <h4>Ärendets namn</h4>
          {legalCase.name}
          <hr/>
          <h4>Aktivt</h4>
          {active}
          <hr/>
          <h4>Skapat</h4>
          {created.yyyymmdd()}
          <hr/>
          <small>Uppdaterat: {updated.yyyymmdd()}</small>
        </div>
      </div>
    );
  }
}
