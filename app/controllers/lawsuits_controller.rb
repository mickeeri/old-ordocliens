class LawsuitsController < ApplicationController
  include ActionView::Helpers::NumberHelper
  before_action :authenticate_user!
  before_action :filter_lawsuits, only: [:index]
  before_action :fetch_lawsuit, only: [:show,
                                       :update,
                                       :destroy,
                                       :report,
                                       :client_list,
                                       :lawsuit_cover,
                                       :client_fund_report]
  respond_to :json, :html, :docx

  def index
    respond_to do |format|
      format.html do
        render component: "LawsuitsIndex", props:
          { initialLawsuits: prepare_array(@lawsuits),
            meta: pagination_dict(@lawsuits),
            current_user_id: current_user.id }
      end
      format.json do
        if params[:page].present?
          render json: @lawsuits, meta: pagination_dict(@lawsuits)
        else
          # For lawsuit list on client page.
          @lawsuits = Client
                      .within_firm(current_user)
                      .find(params[:client_id]).lawsuits
          respond_with @lawsuits.sorted
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.html do
        render component: "LawsuitShow", props: props
      end
      format.json { render json: { lawsuit: @lawsuit } }
    end
  end

  def new
    render component: "LawsuitNew", props: {
      client_id: params[:client_id].to_i }
  end

  def create
    @lawsuit = current_user.lawsuits.build(lawsuit_params)
    client = Client.within_firm(current_user).find(params[:client_id])
    # Assigning primary client.
    @lawsuit.primary_client_id = client.id
    # Then adding client to has_many through relation.
    @lawsuit.clients << client
    @lawsuit.save
    respond_with @lawsuit
  end

  def update
    @lawsuit.update_attributes(lawsuit_params)
    respond_with @lawsuit
  end

  def destroy
    @lawsuit.destroy
    flash.keep[:notice] = "Ärende raderat."
    respond_with @lawsuit
  end

  def client_fund_report
    @funds = @lawsuit.client_funds.sorted
  end

  def lawsuit_cover
    # Empty
  end

  private

  def lawsuit_params
    params.require(:lawsuit).permit(:lawsuit_type_id,
                                    :closed,
                                    :court,
                                    :case_number)
  end

  # Filter lawsuits based on different paramaters.
  def filter_lawsuits
    @lawsuits = Lawsuit.within_firm(current_user)
    if params[:search].present?
      @lawsuits = filter_by_search
    else
      @lawsuits = @lawsuits.sorted_by_primary_client
    end
    @lawsuits = filter_by_user
    @lawsuits = filter_by_status
    @lawsuits = @lawsuits.page(params[:page]).per_page(20)
  end

  def filter_by_search
    @lawsuits.search(params[:search])
  end

  def filter_by_user
    if params[:user].present?
      # Fetch all users in firm.
      if params[:user].to_i == 0
        @lawsuits
      else
        # Fetch lawsuits belonging to specific user.
        @lawsuits.users_lawsuits(
          if params[:user].present?
            params[:user]
          else
            current_user.id
          end)
      end
    else
      @lawsuits.users_lawsuits(current_user)
    end
  end

  def filter_by_status
    if params[:status] == "all"
      @lawsuits
    else
      @lawsuits.without_closed
    end
  end

  def fetch_lawsuit
    @lawsuit = Lawsuit.within_firm(current_user).find(params[:id])
  end

  # Props for show view.
  def props
    { lawsuit: prepare(@lawsuit, LawsuitShowSerializer, root: false),
      tasks: prepare_array(@lawsuit.tasks.sorted_by_date),
      expenses: prepare_array(@lawsuit.expenses.sorted),
      client_funds: {
        client_funds_array: prepare_array(@lawsuit.client_funds.sorted),
        sum: number_to_currency(@lawsuit.client_funds.sum(:balance),
                                delimiter: " ") },
      primary_client: prepare(@lawsuit.primary_client,
                              ClientSerializer,
                              root: false) }
  end
end
