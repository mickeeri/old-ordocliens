class ConfirmDeleteModal extends React.Component {
  handleOnConfirmDeleteClick() {
    makeDeleteRequest(this.props.url)
      .success(response => {
        // Either redirect to other page or publish subscription.
        if (this.props.redirectTo) {
          window.location = this.props.redirectTo;
        } else {
          // Redirect and hide modal.
          PubSub.publish(this.props.subToPublish);
          $('#' + this.props.target).modal('hide');
        }
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div className="modal fade" id={this.props.target}
        tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"
                data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="myModalLabel">Bekräfta borttagning</h4>
            </div>
            <div className="modal-body">
              Är du säker?
            </div>
            <div className="modal-footer action">
              <button type="button" className="btn btn-secondary"
                data-dismiss="modal">Avbryt</button>
              <button type="button" className="btn btn-danger"
                onClick={this.handleOnConfirmDeleteClick.bind(this)}>Radera</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConfirmDeleteModal.propTypes = {
  target: React.PropTypes.string.isRequired,
  subToPublish: React.PropTypes.string,
  url: React.PropTypes.string,
  redirectTo: React.PropTypes.string,
};
