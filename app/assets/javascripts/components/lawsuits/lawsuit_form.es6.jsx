class LawsuitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caseNumber: props.initialLawsuit ? props.initialLawsuit.caseNumber : '',
      closed: props.initialLawsuit ? props.initialLawsuit.closed : false,
      court: props.initialLawsuit ? props.initialLawsuit.court : '',
      id: props.initialLawsuit ? props.initialLawsuit.id : '',
      lawsuitTypeId: props.initialLawsuit ? props.initialLawsuit.lawsuitType.id : '',
      showForm: true,
    };
    this.fetchLawsuitTypes = this.fetchLawsuitTypes.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.setLawsuitType = this.setLawsuitType.bind(this);
  }

  componentDidMount() {
    this.fetchLawsuitTypes();
  }

  setLawsuitType(e) {
    validateCheckBox(e.target.value, 'lawsuitTypes');
    this.setState({ lawsuitTypeId: e.target.value });
  }

  // Submit when pressing Enter.
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleOnSubmit(e);
    }
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const alert = $('#lawsuit-form-message');
    if (this.state.id) { // If it has id it is update.
      makePutRequest(
        Routes.lawsuit_path(this.state.id, this.props.clientId),
        { lawsuit: this.state })
        .done(() => {
          alert.text('Ärende uppdaterat');
          alert.removeClass('text-danger');
          alert.addClass('text-success');
          alert.slideDown();
          alert.delay(1000).slideUp(300);
          // Remove green or red text when updated successfully.
          $('.form-group').removeClass('has-success');
          $('.form-group').removeClass('has-error');
        })
        .fail(xhr => {
          alert.text(`Fel uppstod. Statuskod: ${xhr.status}`);
          alert.addClass('text-danger');
          alert.slideDown(300);
        });
    } else { // Otherwise post.
      makePostRequest(
        `${Routes.lawsuits_path()}?client_id=${this.props.clientId}`,
        { lawsuit: this.state })
        .done(() => {
          // Replace form with success message.
          this.setState({ showForm: false });
          showAlertInModal(
            'Ärende sparat',
            '#lawsuit-modal-alert',
            'alert-success',
            'fa-check');
          setTimeout(() => {
            PubSub.publish('lawsuitsTouched');
          }, 1000);
        })
        .fail(xhr => {
          if (xhr.status === 422) {
            alert.text('Formuläret innehåller fel. Rätta till dem och försök igen.');
          } else {
            alert.text(`Fel uppstod. Statuskod: ${xhr.status}`);
          }
          alert.addClass('text-danger');
          alert.slideDown(300);
        });
    }
  }

  handleInputChange(e) {
    if (this.validate(e)) {
      const nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  validate(e) {
    const input = e.target ? e.target : e;

    if (input.id === 'court') {
      return validateStringLength(input.value, 100, '', input.id, 'Domstol');
    }
    if (input.id === 'caseNumber') {
      return validateStringLength(input.value, 20, '', input.id, 'Målnummer');
    }
    if (input.id === 'lawsuitTypes') {
      console.log(input.value);
    }

    return false;
  }

  fetchLawsuitTypes() {
    const url = Routes.lawsuit_types_path();
    makeGetRequest(url)
      .success(response => {
        this.setState({ lawsuitTypes: response.lawsuitTypes });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    const isEdit = this.state.id !== '';
    const createdDate = this.props.initialLawsuit ?
      new Date(this.props.initialLawsuit.createdAt).yyyymmdd() : '';
    return (
      <div>
        <div className="alert modal-alert" id="lawsuit-modal-alert">
          <i className="fa" id="lawsuit-modal-alert-icon" aria-hidden="true"></i>
          <span id="lawsuit-modal-alert-span"></span>
        </div>
        {this.state.showForm ?
          <form onKeyPress={this.handleKeyPress} onSubmit={this.handleOnSubmit}>
            <p className="hidden message" id="lawsuit-form-message"></p>
            {isEdit ?
              <div className="form-group row">
                <div className="col-md-9 col-xs-6"><strong>Skapat:</strong></div>
                <div className="col-md-3 col-xs-6 content-right">{createdDate}</div>
              </div>
              : ''}
            <div id="lawsuitTypesGroup" className="form-group row">
              <div className="col-sm-6 col-sm-offset-6">
                <LawsuitTypesDropdown
                  selectedId={parseInt(this.state.lawsuitTypeId, 10)}
                  changeEvent={this.setLawsuitType}
                />
              </div>
            </div>
            <div id="courtGroup" className="form-group row">
              <label className="col-sm-6 form-control-label" htmlFor="court">Domstol</label>
              <div className="col-sm-6">
                <input
                  placeholder="Domstol"
                  className="form-control form-control-sm"
                  name="court"
                  id="court"
                  type="text"
                  value={this.state.court}
                  onChange={this.handleInputChange}
                />
              </div>
              <small id="courtHelper" className="text-muted"></small>
            </div>
            <div id="caseNumberGroup" className="form-group row">
              <label className="col-sm-8 form-control-label" htmlFor="caseNumber">Målnummer</label>
              <div className="col-sm-4">
                <input
                  className="form-control form-control-sm"
                  id="caseNumber"
                  name="caseNumber"
                  onChange={this.handleInputChange}
                  placeholder="Målnummer"
                  value={this.state.caseNumber}
                />
              </div>
              <small id="caseNumberHelper" className="text-muted"></small>
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
                {isEdit ? 'Uppdatera' : 'Spara ärende'}
              </button>
            </div>
          </form>
        : ''}
      </div>
    );
  }
}

LawsuitForm.propTypes = {
  initialLawsuit: React.PropTypes.object,
  clientId: React.PropTypes.number,
};
