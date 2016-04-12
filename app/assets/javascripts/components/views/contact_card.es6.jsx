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
