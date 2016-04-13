class ClientEditForm extends React.Component {
  displayName: 'ClientEditForm';

  constructor(props)  {
    super(props);
    this.state = props;
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
  }

  handleOnSubmit(e) {
    this.setState({value: e.target.value});
    console.log(this.state);
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('editModeButtonClicked');
  }

  render() {
    var client = this.state.client;
    var contactInfo = this.state.contacts.map(contact=>{
      return <ContactCardEditable key={contact.id} contact={contact} />
    });
    return (
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Redigera</h3>
          </div>
          <div className="panel-body">
            <form onChange={this.handleOnSubmit}>
              <div className="form-group">
                <label htmlFor="first_name">Förnamn</label>
                <input className="form-control" type="text" defaultValue={client.first_name} id="first_name" />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Efternamn</label>
                <input className="form-control" type="text" defaultValue={client.last_name} id="last_name" />
              </div>
              <div className="form-group">
                <label htmlFor="ssn">Personnummer</label>
                <input className="form-control" type="text" defaultValue={client.ssn} id="ssn" />
              </div>
              <hr/>
              <div className="form-group">
                <label htmlFor="street">Gatuadress</label>
                <input className="form-control" type="text" defaultValue={client.street} id="street" />
              </div>
              <div className="form-group">
                <label htmlFor="postCode">Postnummer</label>
                <input className="form-control" type="text" defaultValue={client.post_code} id="postCode" />
              </div>
              <div className="form-group">
                <label htmlFor="city">Ort</label>
                <input className="form-control" type="text" defaultValue={client.city} id="city" />
              </div>
              <hr/>
              {contactInfo}
              <hr/>
              <div className="form-group">
                <label htmlFor="note">Anteckningar</label>
                <textarea className="form-control" type="text-area" defaultValue={client.note} id="note" rows="4" />
              </div>
              <div className="action pull-right">
                <button className="btn btn-default" onClick={this.handleCancelButtonClick}>Avbryt</button>
                <button className="btn btn-success" type="submit">Spara</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
