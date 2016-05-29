class CounterpartsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_counterparts, only: [:index]
  before_action :fetch_counterpart, only: [:show, :update, :destroy]
  respond_to :json, :html

  def index
    respond_to do |format|
      format.html do
        render component: "CounterpartsIndex", props:
          { initialCounterparts: prepare_array(@counterparts),
            meta: pagination_dict(@counterparts) }
      end
      format.json do
        if params[:page].present?
          render json: @counterparts, meta: pagination_dict(@counterparts)
        else
          # For dropdown.
          respond_with @counterparts
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.html do
        render component: "CounterpartShow", props: show_props
      end
      format.json do
        respond_with @counterpart
      end
    end
  end

  def create
    @counterpart = Counterpart.new(counterpart_params.except(:lawsuit_id))
    if @counterpart.save
      if counterpart_params[:lawsuit_id]
        add_counterpart_to_lawsuit
      else
        flash[:success] = "Motpart sparad!"
      end
    end
    respond_with @counterpart
  end

  def update
    if counterpart_params[:lawsuit_id]
      add_counterpart_to_lawsuit
      @counterpart.save
    else
      @counterpart.update_attributes(counterpart_params)
    end
    respond_with @counterpart
  end

  def destroy
    if params[:lawsuit_id].present?
      # Delete relation between counterpart and lawsuit.
      Involvement.find_by_counterpart_id_and_lawsuit_id(
        params[:id],
        params[:lawsuit_id]).delete
    else
      # Delete counterpart altogether.
      @counterpart.destroy
      flash.keep[:notice] = "Motpart raderad"
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
      :first_name,
      :last_name,
      :personal_number,
      :representative,
      :info,
      :lawsuit_id
    )
  end

  def search_counterparts
    # Select all the counterparts that is involved with the users in the firm.
    @counterparts = Counterpart.in_firm(User.in_same_firm(current_user))
    @counterparts =
      if params[:search].present?
        @counterparts = @counterparts.search(params[:search])
      else
        @counterparts
      end.sorted.page(params[:page]).per_page(20)
  end

  def add_counterpart_to_lawsuit
    lawsuit = Lawsuit.find(counterpart_params[:lawsuit_id])
    @counterpart.lawsuits << lawsuit
    # Add the counterpart to all clients involved in lawsuit.
    lawsuit.clients.each do |client|
      @counterpart.clients << client
    end
  end

  def fetch_counterpart
    @counterpart = Counterpart.find(params[:id])
  end

  def show_props
    { initial_counterpart: prepare(
      @counterpart,
      CounterpartShowSerializer,
      root: false
    ), lawsuits: prepare_array(@counterpart.lawsuits, "ShowSerializer") }
  end
end
