class ContactCard extends React.Component {
  displayName: 'ContactCard';
  constructor(props) {
    super(props);
  }

  render() {
    var contact = this.props.contact
    return (
      <ul className="contact-card">
        <li>{contact.contact_type}: {contact.contact}</li>
      </ul>
    );
  }
}

class ContactCardEditable extends React.Component {
  displayName: 'ContactCardEditable';
  constructor(props) {
    super(props);
  }

  render() {
    var contact = this.props.contact
    return (
      <div className="form-group">
        <label htmlFor={contact.contact_type.toLowerCase()}>{contact.contact_type}</label>
        <input className="form-control" type="text" defaultValue={contact.contact} id={contact.contact_type.toLowerCase()} />
      </div>
    );
  }
}
