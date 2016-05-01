class DeleteLegalCaseButton extends React.Component {
  render() {
    var target = 'deleteLegalCase';
    return (
      <div className="card">
        <ConfirmDeleteModal
          target={target}
          url={Routes.client_legal_case_path(this.props.clientId, this.props.legalCaseId)}
          redirectTo={Routes.client_path(clientId)} />
        <div className="row card-block">
          <div className="col-md-8">
            <h3>Radera mål</h3>
            Radera mål och tillhörande tidrapport.
          </div>
          <div className="col-md-4">
            <a href="#" className="btn btn-danger-outline"
              data-toggle="modal"
              data-target="#{target}">Radera mål
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DeleteLegalCaseButton.propTypes = {
  clientId: React.PropTypes.number.isRequired,
  legalCaseId: React.PropTypes.number.isRequired,
};
