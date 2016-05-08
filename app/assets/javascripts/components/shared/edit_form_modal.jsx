class EditFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.removeModal = this.removeModal.bind(this);
    this.closeBtnClicked = this.closeBtnClicked.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('dismissEdit', this.removeModal);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('dismissEdit');
  }

  closeBtnClicked() {
    this.removeModal();
  }

  // Remove modal from DOM.
  removeModal() {
    $('#editFormModal').modal('hide');
    ReactDOM.unmountComponentAtNode(document.getElementById('editModalContainer'));
  }

  render() {
    return (
      <div
        className="modal fade"
        id="editFormModal"
        tabIndex={-1} role="dialog" aria-labelledby="modalLabel"
      >
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
