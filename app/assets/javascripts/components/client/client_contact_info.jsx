class ClientContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: props.contacts,
      editMode: false,
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode() {
    if (this.state.editMode) {
      this.setState({ editMode: false });
      $('.toggle-edit').removeClass('active');
    } else {
      this.setState({ editMode: true });
      $('.toggle-edit').addClass('active');
    }
  }

  render() {

    var content;
    if (this.state.editMode) {
      content = <EditContactsForm contacts={this.state.contacts}
        toggleEdit={this.toggleEditMode} />;
    } else {
      content = <ContactInfo contacts={this.state.contacts} />;
    }

    return (
      <div className="row">
        <div className="col-md-9">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Kontaktuppgifter</h3>
            </div>
            <div className="panel-body">
              { content }
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="panel panel-default">
            <div className="panel-body button-menu" role="group">
              <button className="button toggle-edit"
                onClick={this.toggleEditMode}>Ändra kontaktuppgifter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ContactInfo extends React.Component {
  render() {
    var contactListItem = this.props.contacts.map(contact=>
      <li key={contact.id}>{contact.contact_type}: {contact.contact}</li>
    );

    var contacts = this.props.contacts;
    return (
        <ul className="contact-card">
          { contactListItem }
        </ul>
    );
  }
}

class EditContactsForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    event.preventDefault();
    this.props.toggleEdit();
  }

  render() {
    var contactFormGroups = this.props.contacts.map(contact =>
      <div key={contact.id} className="form-group">
        <label htmlFor={contact.contact_type.toLowerCase()}>
          {contact.contact_type}</label>
        <input
          className="form-control"
          type="text"
          defaultValue={contact.contact}
          id={contact.contact_type.toLowerCase()} />
      </div>);

    return (
      <form>
        {contactFormGroups}
        <hr/>
        <div className="action">
          <button className="button button-success">Spara</button>
          <button className="button"
            onClick={this.handleOnClick}>Avbryt</button>
        </div>
      </form>
    );
  }
}
