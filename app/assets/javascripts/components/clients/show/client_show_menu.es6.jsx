class ClientShowMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditButtonClic = this.handleEditButtonClick.bind(this);
    this.handleOnDeleteButtonClick = this.handleOnDeleteButtonClick.bind(this);
  }

  handleEditButtonClick() {
    PubSub.publish('editModeButtonClicked');
  }

  handleOnDeleteButtonClick(e) {
    console.log('Clicked delete button. Client show menu');
    e.preventDefault();
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
