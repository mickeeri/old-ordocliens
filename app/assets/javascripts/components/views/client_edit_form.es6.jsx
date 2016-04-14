class ClientEditForm extends React.Component {
  displayName: 'ClientEditForm';

  constructor(props)  {
    super(props);
    this.state = props.client;
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleChangeOnClientInput = this.handleChangeOnClientInput.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    makePutRequest(Routes.client_path(this.state.id), this.state)
      .then(response=> {
        if (response.status === 200) {
          PubSub.publish('clientUpdated');
        }
      });
  }

  handleChangeOnClientInput(event) {
    var nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('editModeButtonClicked');
  }

  render() {
    return (
      <div className="col-md-9">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Redigera</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleOnSubmit}>
              <FormGroup
                name="first_name"
                type="text"
                value={this.state.first_name}
                changeEvent={this.handleChangeOnClientInput}
                label="Förnamn"/>
              <FormGroup
                name="last_name"
                type="text"
                value={this.state.last_name}
                changeEvent={this.handleChangeOnClientInput}
                label="Efternamn"/>
              <FormGroup
                name="ssn"
                type="text"
                value={this.state.ssn}
                changeEvent={this.handleChangeOnClientInput}
                label="Personnummer"/>
              <hr/>
              <FormGroup
                name="street"
                type="text"
                value={this.state.street}
                changeEvent={this.handleChangeOnClientInput}
                label="Gatuadress"/>
              <FormGroup
                name="post_code"
                type="text"
                value={this.state.post_code}
                changeEvent={this.handleChangeOnClientInput}
                label="Postnummer"/>
              <FormGroup
                name="city"
                type="text"
                value={this.state.city}
                changeEvent={this.handleChangeOnClientInput}
                label="Ort"/>
              <hr/>
              <div className="form-group">
                <label htmlFor="note">Anteckningar</label>
                <textarea className="form-control" type="text-area"
                  defaultValue={this.state.note} name="note" rows="4"
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
