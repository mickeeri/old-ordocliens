class ClientInfo extends React.Component {
  displayName: 'ClientInfo';

  constructor(props)  {
    super(props);
  }

  render() {
    var client = this.props.client;
    var contactInfo = this.props.contacts.map(contact=>{
      return <ContactCard key={contact.id} contact={contact} />
    });
    return (
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{client.first_name} {client.last_name}</h3>
          </div>
          <div className="panel-body">
            <h4>Personnummer</h4>
            {client.ssn}
            <hr/>
            <h4>Adress</h4>
            {client.street} <br/>
            {client.post_code} {client.city}
            <hr/>
            <h4>Kontakt</h4>
            {contactInfo}
            <hr />
            <h4>Anteckning</h4>
            <div>{client.note}</div>
          </div>
        </div>
      </div>
    );
  }
}
