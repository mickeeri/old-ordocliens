class ClientShowMenu extends React.Component {
  displayName: 'ClientShowMenu';
  constructor(props) {
    super(props);
    this.handleEditButtonClic = this.handleEditButtonClick.bind(this);
    this.handleOnDeleteButtonClick = this.handleOnDeleteButtonClick.bind(this);
  }

  handleEditButtonClick(event) {
    PubSub.publish('editModeButtonClicked');
  }

  handleOnDeleteButtonClick(event) {
    event.preventDefault();
    PubSub.publish('deleteButtonClicked');
  }

  render() {
    return (
      <div className="panel-body np">
        <ConfirmDeleteModal target="deleteClient" subToPublish="deleteClientConfirmed"/>
        <div className="button-menu" role="group" aria-label="...">
          <button className="button edit-client-button"
            onClick={this.handleEditButtonClick}>Redigera klient
          </button>
          <button className="button button-danger" data-toggle="modal"
            data-target="#deleteClient">Ta bort klient
          </button>
        </div>
      </div>
    );
  }
}
