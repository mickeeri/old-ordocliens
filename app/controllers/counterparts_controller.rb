class CounterpartsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json, :html

  def index
    @counterparts = Counterpart.all.sorted
    respond_to do |format|
      format.html do
        render component: "CounterpartsIndex"
      end
      format.json do
        render json: @counterparts
      end
    end
  end

  def show
    respond_to do |format|
      format.html do
        render component: "CounterpartShow"
      end
    end
  end

  def create
    @counterpart = Counterpart.build(counterpart_params)
    if @counterpart.save
      if client_params[:lawsuit_id]
        add_counterpart_to_lawsuit
      else
        flash[:success] = "Klient sparad!"
      end
    end
    respond_with(@counterpart)
  end

  def update
    @counterpart = Counterpart.find(params[:id])
    if counterpart_params[:lawsuit_id]
      add_counterpart_to_lawsuit
    else
      @counterpart.update_attributes(counterpart_params)
    end
    respond_with @counterpart
  end

  def lawsuit_counterpart_list
    lawsuit = Lawsuit.find(params[:id])
    respond_with lawsuit.counterparts
  end

  private

  def counterpart_params
    params.require(:counterpart).permit(
      :name,
      :personal_number,
      :representative,
      :info,
      :lawsuit_id)
  end

  def add_counterpart_to_lawsuit
    lawsuit = Lawsuit.find(counterpart_params[:lawsuit_id])
    @counterpart.lawsuits << lawsuit unless
      @counterpart.lawsuits.include?(lawsuit)
  end
end
