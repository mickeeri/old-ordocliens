class DeleteLawsuitButton extends React.Component {
  render() {
    var target = 'deleteLawsuit';
    return (
      <div className="card card-block">
        <ConfirmDeleteModal
          target={target}
          url={Routes.client_legal_case_path(this.props.clientId, this.props.legalCaseId)}
          redirectTo={Routes.client_path(this.props.clientId)} />
        <div className="row">
          <div className="col-md-12">
            <h3>Radera mål</h3>
            Radera mål och tillhörande tidrapport.
          </div>
          <div className="col-md-12">
            <a href="#" className="btn btn-danger-outline"
              data-toggle="modal"
              data-target={'#' + target}>Radera mål
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DeleteLawsuitButton.propTypes = {
  clientId: React.PropTypes.number.isRequired,
  legalCaseId: React.PropTypes.number.isRequired,
};
