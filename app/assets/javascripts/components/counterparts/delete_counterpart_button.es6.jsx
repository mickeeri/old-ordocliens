function DeleteCounterpartButton({ counterpartId }) {
  const target = 'deleteCounterpart';
  return (
    <div>
      <ConfirmDeleteModal
        target={target}
        resourceName="motpart"
        url={Routes.counterpart_path(counterpartId)}
        redirectTo={Routes.counterparts_path()}
      />
      <div className="row">
        <div className="col-md-12">
          <a
            href="#"
            className="btn btn-danger-outline width-fill"
            data-toggle="modal"
            data-target={`#${target}`}
          >Radera motpart
          </a>
        </div>
      </div>
    </div>
  );
}

DeleteCounterpartButton.propTypes = {
  counterpartId: React.PropTypes.number.isRequired,
};
