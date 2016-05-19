class TasksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: this.props.initialTasks };
    this.refreshTasks = this.refreshTasks.bind(this);
    this.addTaskClicked = this.addTaskClicked.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.scrollToExpenses = this.scrollToExpenses.bind(this);
    this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
    this.renderForm = this.renderForm.bind(this);
    // TODO; move task table the own component.
  }

  componentDidMount() {
    PubSub.subscribe('tasksTouched', this.refreshTasks);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('tasksTouched');
  }

  refreshTasks() {
    const url = Routes.lawsuit_tasks_path(this.props.lawsuitId);
    makeGetRequest(url)
      .success(response => {
        this.setState({ tasks: response.tasks });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
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
    const taskRows = this.state.tasks.map(task =>
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
              href={`/lawsuit_cover/${this.props.lawsuitId}.docx`}
              className="btn btn-primary"
            >Aktomslag docx</a>
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
          initialExpenses={this.props.initialExpenses}
          lawsuitId={this.props.lawsuitId}
        />
      </div>
    );
  }
}

TasksIndex.propTypes = {
  initialTasks: React.PropTypes.array.isRequired,
  initialExpenses: React.PropTypes.array.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number,
};
