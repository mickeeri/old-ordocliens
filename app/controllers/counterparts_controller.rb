class CounterpartsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    @counterparts = Lawsuit.find(params[:lawsuit_id]).counterparts
    respond_with @counterparts
  end

  def create
    lawsuit = Lawsuit.find(params[:lawsuit_id])
    @counterpart = lawsuit.counterparts.create(counterpart_params)
    respond_with(lawsuit, @counterpart)
  end

  def update
    @counterpart = Counterpart.find(params[:id])
    @counterpart.update_attributes(counterpart_params)
    respond_with @counterpart
  end

  private

  def counterpart_params
    params.require(:counterpart).permit(
      :name,
      :personal_number,
      :representative,
      :info)
  end
end
