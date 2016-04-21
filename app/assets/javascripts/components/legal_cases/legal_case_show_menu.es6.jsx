class LegalCaseShowMenu extends React.Component {
  displayName: 'LegalCaseShowMenu';
  constructor(props) {
    super(props);
    this.handleEditButtonClic = this.handleEditButtonClick.bind(this);
    this.handleOnDeleteButtonClick = this.handleOnDeleteButtonClick.bind(this);
  }

  handleEditButtonClick(e) {
    PubSub.publish('editModeButtonClicked');
  }

  handleOnDeleteButtonClick(e) {
    e.preventDefault();
    PubSub.publish('deleteButtonClicked');
  }

  render() {
    return (
      <div className="panel-body np">
        <ConfirmDeleteModal target="deleteLegalCase" subToPublish="deleteLegalCaseConfirmed" />
        <div className="button-menu" role="group" aria-label="...">
          <button className="button edit-button"
            onClick={this.handleEditButtonClick}>Redigera ärende
          </button>
          <button className="button button-danger" data-toggle="modal"
            data-target="#deleteLegalCase">Ta bort ärende
          </button>
        </div>
      </div>
    );
  }
}

class ConfirmDeleteModal extends React.Component {
  displayName: 'ConfirmDeleteModal';

  handleOnConfirmDeleteClick() {
    PubSub.publish('deleteLegalCaseConfirmed');
  }

  render() {
    return (
      <div className="modal fade" id="confirmDeleteCaseModal"
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
                onClick={this.handleOnConfirmDeleteClick}>Ja</button>
              <button type="button" className="button"
                data-dismiss="modal">Avbryt</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
