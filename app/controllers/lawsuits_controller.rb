class LawsuitsController < ApplicationController
  before_action :authenticate_user!
  before_action :filter_lawsuits, only: [:index]
  before_action :fetch_lawsuit, only: [:show,
                                       :update,
                                       :destroy,
                                       :report,
                                       :client_list,
                                       :lawsuit_cover]
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
    # Saving
    add_slug if @lawsuit.save
    # Then adding client to has_many through relation.
    @lawsuit.clients << client
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
    # http://www.justinweiss.com/articles/search-and-filter-rails-models-without-bloating-your-controller/
    @lawsuits = Lawsuit.within_firm(current_user)
    # Find specific users lawsuits. If user_id = "0" select all within firm.
    @lawsuits = @lawsuits.users_lawsuits(
      if params[:user].present?
        params[:user]
      else
        current_user.id
      end) unless params[:user] == "0"
    @lawsuits = @lawsuits.without_closed unless params[:all] == "true"
    @lawsuits = @lawsuits.search(params[:search]) if params[:search].present?
    # TODO: Search and sort without crashing.
    # https://github.com/Casecommons/pg_search/issues/109
    # https://github.com/Casecommons/pg_search/issues/206
    @lawsuits = @lawsuits.sorted_by_primary_client unless params[:search].present?
    @lawsuits = @lawsuits.page(params[:page]).per_page(20)
  end

  def fetch_lawsuit
    @lawsuit = Lawsuit.within_firm(current_user).find(params[:id])
  end

  # Props for show view.
  def props
    { lawsuit: prepare(@lawsuit, LawsuitShowSerializer, root: false),
      tasks: prepare_array(@lawsuit.tasks.sorted_by_date),
      expenses: prepare_array(@lawsuit.expenses.sorted),
      primary_client: prepare(@lawsuit.primary_client, ClientSerializer, root: false) }
  end

  # Buildning slug with initials, year and id.
  # Should be in model, but cannot access current_user there.
  def add_slug
    first_name_initial = current_user.first_name[0, 1].downcase
    last_name_initial = current_user.last_name[0, 1].downcase
    initials = first_name_initial << last_name_initial
    slug = @lawsuit.created_at.strftime("#{initials}%y-#{@lawsuit.id}")
    @lawsuit.update(slug: slug)
  end
end
