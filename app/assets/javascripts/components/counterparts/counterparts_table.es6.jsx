/* global CounterPartRow */
/* global Paginator */

class CounterPartsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counterparts: props.counterparts,
      meta: props.meta,
    };
  }

  render() {
    let rows = this.state.counterparts.map(counterpart =>
      <CounterPartRow
        key={counterpart.id}
        counterpart={counterpart}
        clientId={this.props.clientId}
      />
    );

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h1>{this.props.header}</h1>
          </div>
          <div className="col-md-8">
            <form>
              <input
                className="form-control"
                placeholder="Sök på namn eller personnummer"
                autoFocus="true"
                onChange={this.handleOnSearch}
                ref="search"
              />
            {this.state.meta.total_pages === 1 ? '' :
              <Paginator
                totalPages={this.state.meta.total_pages}
                currentPage={this.state.meta.current_page}
                nextPage={this.state.meta.next_page}
                prevPage={this.state.meta.previous_page}
                onPaginate={this.handleOnPaginate}
              />
            }
            </form>
          </div>
        </div>
        <div className="row">
          <table className="table table-bordered table-striped col-md-12">
            <thead>
              <tr>
                <th>Namn</th>
                <th>Personnummer</th>
                <th>Motpartsombud</th>
                <th>Motpart till</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

CounterPartsTable.propTypes = {
  clientId: React.PropTypes.number,
  counterparts: React.PropTypes.array.isRequired,
  meta: React.PropTypes.object.isRequired,
  header: React.PropTypes.string.isRequired,
};
