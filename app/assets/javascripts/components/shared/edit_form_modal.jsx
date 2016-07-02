class EditFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.removeModal = this.removeModal.bind(this);
    this.closeBtnClicked = this.closeBtnClicked.bind(this);
  }

  componentDidMount() {
    // Remove modal when clicking on backdrop.
    // Bootstrap has own function for doing this, but it doesn't remove
    // modal completely, only hides it.
    $('.modal').click((e) => {
      if (e.target.id === 'editFormModal') {
        this.removeModal();
      }
    });
    // Remove modal when clicking Esc.
    $(document).keyup((e) => {
      if (e.keyCode === 27) {
        this.removeModal();
      }
    });
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
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1} role="dialog" aria-labelledby="modalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.closeBtnClicked}
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
