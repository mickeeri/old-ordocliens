class CounterpartsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    @counterparts = Client.find(params[:client_id]).counterparts
    respond_with @counterparts
  end

  def create
    client = Client.find(params[:client_id])
    @counterpart = client.counterparts.create(counterpart_params)
    respond_with(client, @counterpart)
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
