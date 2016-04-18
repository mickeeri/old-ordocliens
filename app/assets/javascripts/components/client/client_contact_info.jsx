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
    this.state = {
      contacts: props.contacts,
      contactTypes: [],
    };
    this.getContactTypes();
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getContactTypes = this.getContactTypes.bind(this);
  }

  handleOnClick(event) {
    event.preventDefault();
    this.props.toggleEdit();
  }

  getContactTypes() {
    makeGetRequest('/contact_types')
      .success(data=> {
        this.setState({ contactTypes: data.contact_types });
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    var formGroups;
    if (this.state.contacts.length > 0) {
      formGroups = this.state.contacts.map(contact =>
        <ContactFormGroup key={contact.id} contact={contact}
          contactTypes={this.state.contactTypes} />);
    } else {
      formGroups = <ContactFormGroup contactTypes={this.state.contactTypes} />;
    }

    return (
      <form className="contact-form">
        {formGroups}
        <div className="action">
          <button className="button button-success">Spara</button>
          <button className="button"
            onClick={this.handleOnClick}>Avbryt</button>
        </div>
      </form>
    );
  }
}

class ContactFormGroup extends React.Component {

  render() {
    var contact = this.props.contact ? this.props.contact : null;
    var contactTypeOptions = this.props.contactTypes.map(contactType =>
      <option key={contactType.id}>{contactType.contact_type_name}</option>);

    return (
      <div className="row contact-form-group">
        <div className="col-md-6">
          <label>Kontakttyp</label>
          <select className="form-control"
            value={contact ? contact.contact_type : ''}>
            {contactTypeOptions}
          </select>
        </div>
        <div className="col-md-6">
          <label>Kontakt</label>
          <input
            className="form-control"
            type="text"
            value={contact ? contact.contact : ''}
            />
        </div>
      </div>
    );
  }
}
