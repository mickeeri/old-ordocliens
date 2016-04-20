class ClientEditForm extends React.Component {
  displayName: 'ClientEditForm';

  constructor(props)  {
    super(props);
    this.state = props.client;
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleChangeOnClientInput = this.handleChangeOnClientInput.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    if (this.state && this.state.id) {
      makePostOrPutRequest(Routes.client_path(this.state.id), 'PUT', { client: this.state });
    } else {
      makePostOrPutRequest('/clients', 'POST', { client: this.state });
    }
  }

  handleChangeOnClientInput(event) {
    var nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleCancelButtonClick(event) {
    event.preventDefault();
    if (this.state && this.state.id) {
      PubSub.publish('editModeButtonClicked');
    } else {
      window.location = Routes.clients_path();
    }
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.header}</h3>
        </div>
        <div className="panel-body">
          <form className="form-inline" onSubmit={this.handleOnSubmit}>
            <FormGroup
              name="first_name"
              type="text"
              value={this.state ? this.state.first_name : ''}
              changeEvent={this.handleChangeOnClientInput}
              autoFocus="true"
              label="Förnamn"/>
            <FormGroup
              name="last_name"
              type="text"
              value={this.state ? this.state.last_name : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Efternamn"/>
            <FormGroup
              name="ssn"
              type="text"
              value={this.state ? this.state.ssn : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Personnummer"/>
            <hr/>
            <FormGroup
              name="email"
              type="text"
              value={this.state ? this.state.email : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="E-post"/>
            <FormGroup
              name="phone_number"
              type="text"
              value={this.state ? this.state.phone_number : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Telefonnummer"/>
            <hr/>
            <FormGroup
              name="street"
              type="text"
              value={this.state ? this.state.street : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Gatuadress"/>
            <FormGroup
              name="post_code"
              type="text"
              value={this.state ? this.state.post_code : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Postnummer"/>
            <FormGroup
              name="city"
              type="text"
              value={this.state ? this.state.city : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Ort"/>
            <hr/>
            <div className="form-group form-group-textarea">
              <label htmlFor="note">Anteckningar</label>
              <textarea className="form-control" type="text-area"
                value={this.state ? this.state.note : ''} name="note" rows="4"
                onChange={this.handleChangeOnClientInput}>
              </textarea>
            </div>
            <hr/>
            <div className="action">
              <button className="button button-success" type="submit">Spara</button>
              <button className="button button-default"
                onClick={this.handleCancelButtonClick}>Avbryt</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class FormGroup extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          className="form-control"
          type={this.props.type}
          name={this.props.name}
          defaultValue={this.props.value}
          onChange={this.props.changeEvent}/>
      </div>
    );
  }
}
