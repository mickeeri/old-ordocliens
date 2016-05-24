class TasksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
      expenses: this.props.expenses };
    this.addTaskClicked = this.addTaskClicked.bind(this);
    this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.scrollToExpenses = this.scrollToExpenses.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    // TODO; move task table the own component.
  }

  scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;
  }

  scrollToExpenses() {
    $('html, body').animate({
      scrollTop: $('#expenses').offset().top,
    }, 'slow');
    return false;
  }

  handleAddButtonClicked(e) {
    e.preventDefault();
    this.renderForm(e.target.name);
  }

  addTaskClicked(e) {
    e.preventDefault();

    // Render modal...
    ReactDOM.render(
      <EditFormModal
        header="Lägg till arbete"
        form={<TaskForm lawsuitId={this.props.lawsuitId} />}
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  renderForm(target) {
    let form;
    let header;
    if (target === 'addExpense') {
      form = <ExpenseForm lawsuitId={this.props.lawsuitId} />;
      header = 'Lägg till utlägg';
    } else if (target === 'addWork') {
      form = <TaskForm lawsuitId={this.props.lawsuitId} />;
      header = 'Lägg till arbete';
    }

    // Render modal with specified form.
    ReactDOM.render(
      <EditFormModal
        header={header}
        form={form}
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  render() {
    const taskRows = this.props.tasks.map(task =>
      <TaskRow
        key={task.id}
        task={task}
        lawsuitId={this.props.lawsuitId}
        clientId={this.props.clientId}
      />
    );

    return (
      <div>
        <div className="alert" id="tasks-index-alert"></div>
        <div id="editModalContainer"></div>
        <div className="row">
          <h3 className="col-md-4">Arbeten</h3>
          <div className="col-md-8 content-right task-menu">
            <button
              className="btn btn-primary-outline"
              onClick={this.scrollToExpenses}
            >Gå till utlägg</button>
            <a
              href={`/report/${this.props.lawsuitId}.docx`}
              className="btn btn-primary"
            >Rapport .docx</a>
            <a
              href={`/lawsuits/${this.props.lawsuitId}/lawsuit_cover.pdf`}
              className="btn btn-primary"
            >Aktomslag .pdf</a>
            <button
              className="btn btn-success"
              onClick={this.addTaskClicked}
              name="addWork"
            >Lägg till arbete</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-inverse">
              <tr>
                <th>Datum</th>
                <th>Notering</th>
                <th className="text-nowrap">Arbetad tid</th>
                <th className="text-nowrap">Priskategori</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {taskRows}
            </tbody>
          </table>
        </div>
        <div className="row">
          <h3 id="expenses" className="col-md-4">Utlägg</h3>
          <div className="col-md-8 content-right task-menu">
            <button
              className="btn btn-primary-outline"
              onClick={this.scrollToTop}
            >Tillbaka till toppen</button>
            <button
              className="btn btn-success"
              onClick={this.handleAddButtonClicked}
              name="addExpense"
            >Lägg till utlägg</button>
          </div>
        </div>
        <ExpensesIndex
          expenses={this.props.expenses}
          lawsuitId={this.props.lawsuitId}
        />
      </div>
    );
  }
}

TasksIndex.propTypes = {
  clientId: React.PropTypes.number,
  expenses: React.PropTypes.array.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
  tasks: React.PropTypes.array.isRequired,
};
