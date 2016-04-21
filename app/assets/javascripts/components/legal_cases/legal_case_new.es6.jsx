class LegalCaseNew extends React.Component {
  displayName: 'LegalCaseNew';
  render() {
    return (
      <div className="row">
        <div className="col-md-9 col-md-offset-2">
          <LegalCaseEditForm header="Lägg till" client_id={this.props.client_id} />
        </div>
      </div>
    );
  }
}

LegalCaseNew.propTypes = {
  client_id: React.PropTypes.number.isRequired,
};
