class LegalCaseRow extends React.Component {
  handleClick(e) {
    window.location = Routes.client_legal_case_path(this.props.clientId, this.props.legalCase.id);
  }

  render() {
    var legalCase = this.props.legalCase;
    var active = legalCase.active ? 'Ja' : 'Nej';
    return (
      <div>
        <hr/>
        <a
          href={Routes.client_legal_case_path(
            this.props.clientId,
            this.props.legalCase.id)}>{this.props.legalCase.name}
        </a>
      </div>
    );
  }
}

LegalCaseRow.propTypes = {
  legalCase: React.PropTypes.object.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
