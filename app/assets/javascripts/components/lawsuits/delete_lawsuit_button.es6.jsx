class DeleteLawsuitButton extends React.Component {
  render() {
    const target = 'deleteLawsuit';
    return (
      <div className="card card-block">
        <ConfirmDeleteModal
          target={target}
          resourceName="ärende"
          url={Routes.lawsuit_path(this.props.lawsuitId)}
          redirectTo={this.props.clientId ?
            Routes.client_path(this.props.clientId) :
            Routes.lawsuits_path()}
        />
        <div className="row">
          <div className="col-md-12">
            <a
              href="#"
              className="btn btn-danger-outline width-fill"
              data-toggle="modal"
              data-target={`#${target}`}
            >Radera ärende
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DeleteLawsuitButton.propTypes = {
  clientId: React.PropTypes.number,
  lawsuitId: React.PropTypes.number.isRequired,
};
