class ClientShowButtons extends React.Component {
  displayName: 'ClientShowButtons';
  constructor(props) {
    super(props);
    this.handleEditButtonClic = this.handleEditButtonClick.bind(this);
    this.handleOnDeleteButtonClick = this.handleOnDeleteButtonClick.bind(this);
  }

  handleEditButtonClick(e) {
    e.preventDefault();
    PubSub.publish('editModeButtonClicked');
  }

  handleOnDeleteButtonClick(e) {
    e.preventDefault();
    PubSub.publish('deleteButtonClicked');
  }

  render() {
    return (
      <div className="panel-body">
        <ConfirmDeleteModal />
        <ul className="list-group">
          <li className="list-group-item">
            <a href="#" onClick={this.handleEditButtonClick}>Redigera klient
              <span className="pull-right glyphicon glyphicon-pencil"></span></a>
          </li>
          <li className="list-group-item">
            <a className="remove-client-link" href="#" data-toggle="modal"
              data-target="#confirmDeleteClientModal">Ta bort klient<span
              className="pull-right glyphicon glyphicon-remove"></span></a>
          </li>
        </ul>
      </div>
    );
  }
}

class ConfirmDeleteModal extends React.Component {
  displayName: 'ConfirmDeleteModal';

  handleOnConfirmDeleteClick() {
    PubSub.publish('deleteClientConfirmed');
  }

  render() {
    return (
      <div className="modal fade" id="confirmDeleteClientModal"
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
            <div className="modal-footer">
              <button type="button" className="btn btn-default"
                data-dismiss="modal">Avbryt</button>
              <button type="button" className="btn btn-danger"
                onClick={this.handleOnConfirmDeleteClick}>Ja</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
