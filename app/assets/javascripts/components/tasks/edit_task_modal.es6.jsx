class EditTaskModal extends React.Component {
  render() {
    return (
      <div className="modal fade" id="editTaskModal"
        tabIndex={-1} role="dialog" aria-labelledby="modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"
                data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="modalLabel">Lägg till uppgift</h4>
            </div>
            <div className="modal-body">
              <EditTaskForm legalCaseId={this.props.legalCaseId} clientId={this.props.clientId}
                priceCategories={this.props.priceCategories}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditTaskModal.propTypes = {
  legalCaseId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number.isRequired,
  priceCategories: React.PropTypes.array.isRequired,
};
