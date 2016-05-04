/* global makePutRequest */
/* global makePostRequest */
/* global FormGroup */

class LawsuitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.initialLawsuit ? props.initialLawsuit.id : '',
      name: props.initialLawsuit ? props.initialLawsuit.name : '',
      court: props.initialLawsuit ? props.initialLawsuit.court : '',
      case_number: props.initialLawsuit ? props.initialLawsuit.case_number : '',
      closed: props.initialLawsuit ? props.initialLawsuit.closed : '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(Routes.lawsuit_path(this.state.id, this.props.clientId),
        { lawsuit: this.state }, 'lawsuitTouched');
    } else { // Otherwise post.
      const url = `${Routes.lawsuits_path()}?client_id=${this.props.clientId}`;
      makePostRequest(url,
        { lawsuit: this.state }, 'lawsuitsTouched');
    }
  }

  handleInputChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleCheckBoxChange(e) {
    this.setState({ closed: e.target.checked });
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  render() {
    const isEdit = this.state.id !== '';
    return (
      <form className="form form-inline" onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="name">Uppdrag</label>
          <input
            className="form-control form-control-sm"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange}
            autoFocus="true"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="court">Domstol</label>
          <input
            className="form-control form-control-sm"
            name="court"
            type="text"
            value={this.state.court}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="case_number">Målnummer</label>
          <input
            name="case_number"
            className="form-control form-control-sm"
            value={this.state.case_number}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="checkbox">
          {isEdit ?
            <label className="c-input c-checkbox">
              <input
                type="checkbox"
                id="closed"
                checked={this.state.closed}
                onChange={this.handleCheckBoxChange}
              />
              <span className="c-indicator"></span>
                Avslutat
            </label> : ''}
        </div>
        <hr />
        <div className="content-right">
          {isEdit ? '' :
            <button
              className="btn btn-secondary"
              onClick={this.handleCancelButtonClick}
            >Avbryt
            </button>}
          <button className="btn btn-success" type="submit">
            {isEdit ? 'Uppdatera' : 'Spara mål'}
          </button>
        </div>
      </form>
    );
  }
}

LawsuitForm.propTypes = {
  initialLawsuit: React.PropTypes.object,
  clientId: React.PropTypes.number.isRequired,
};