class ConfirmDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { successMessage: '' };
    this.handleOnConfirmDeleteClick = this.handleOnConfirmDeleteClick.bind(this);
  }

  handleOnConfirmDeleteClick() {
    makeDeleteRequest(this.props.url)
      .success(response => {
        // Either redirect to other page or publish subscription.
        if (this.props.redirectTo) {
          window.location = this.props.redirectTo;
        } else {
          // Publish subscription
          PubSub.publish(this.props.subToPublish);
          // Show message
          this.setState({ successMessage: `Raderade ${this.props.resourceName}` });
          // Remove modal.
          setTimeout(() => {
            this.removeModal();
          }, 1000);
        }
      })
      .fail(xhr => {
        console.log(xhr);
        if (xhr.responseText) {
          $('#deleteMessage').text(xhr.responseText);
        } else {
          $('#deleteMessage').text(`Fel uppstod vid radering. Status: ${xhr.status}`);
        }

        $('#deleteMessage').slideDown();
      });
  }

  removeModal() {
    $(`#${this.props.target}`).modal('hide');
    ReactDOM.unmountComponentAtNode(document.getElementById('editModalContainer'));
  }

  render() {
    return (
      <div
        className="modal fade" id={this.props.target}
        tabIndex={-1} role="dialog" aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog" role="document">
            {this.state.successMessage !== '' ?
              <div className="modal-content alert alert-info">
                <i className="fa fa-check"></i>
                {this.state.successMessage}</div> :
              <div className="modal-content">
                <div className="modal-header">
                  <div className="text-danger hidden" id="deleteMessage"></div>
                  <button
                    type="button" className="close"
                    data-dismiss="modal" aria-label="Close"
                  ><span aria-hidden="true">×</span></button>
                  <h4 className="modal-title" id="myModalLabel">Bekräfta borttagning</h4>
                </div>
                <div className="modal-body">
                  {`Är du säker på att du vill radera ${this.props.resourceName}?`}
                </div>
                <div className="modal-footer action">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >Avbryt</button>
                  <button
                    type="button"
                    className="btn btn-danger-outline"
                    onClick={this.handleOnConfirmDeleteClick}
                  >Radera</button>
                </div>
              </div>
            }
        </div>
      </div>
    );
  }
}

ConfirmDeleteModal.propTypes = {
  resourceName: React.PropTypes.string.isRequired,
  redirectTo: React.PropTypes.string,
  subToPublish: React.PropTypes.string,
  target: React.PropTypes.string.isRequired,
  url: React.PropTypes.string,
};
