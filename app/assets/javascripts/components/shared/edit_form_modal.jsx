class EditFormModal extends React.Component {
  closeBtnClicked() {
    PubSub.publish('dismissEdit');
  }

  render() {
    return (
      <div
        className="modal fade"
        id="editFormModal"
        tabIndex={-1} role="dialog" aria-labelledby="modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.closeBtnClicked.bind(this)}
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title" id="modalLabel">{this.props.header}</h4>
            </div>
            <div className="modal-body">
              {this.props.form}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditFormModal.propTypes = {
  form: React.PropTypes.element.isRequired,
  header: React.PropTypes.string.isRequired,
};
