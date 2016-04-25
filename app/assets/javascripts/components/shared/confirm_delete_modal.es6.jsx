class ConfirmDeleteModal extends React.Component {
  handleOnConfirmDeleteClick() {
    PubSub.publish(this.props.subToPublish);
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
              <button type="button" className="button button-danger"
                onClick={this.handleOnConfirmDeleteClick.bind(this)}>Ja</button>
              <button type="button" className="button"
                data-dismiss="modal">Avbryt</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConfirmDeleteModal.propTypes = {
  target: React.PropTypes.string.isRequired,
  subToPublish: React.PropTypes.string.isRequired,
};
