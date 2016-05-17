class LawsuitsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_lawsuits, only: [:index]
  before_action :fetch_lawsuit, only: [:show,
                                       :update,
                                       :destroy,
                                       :report,
                                       :client_list]
  respond_to :json, :html, :docx

  def index
    respond_to do |format|
      format.html do
        render component: "LawsuitsIndex", props:
          { initialLawsuits: prepare_array(@lawsuits),
            meta: pagination_dict(@lawsuits) }
      end
      format.json do
        if params[:page].present?
          render json: @lawsuits, meta: pagination_dict(@lawsuits)
        else
          # For lawsuit list on client page.
          @lawsuits = Client.find(params[:client_id]).lawsuits
          respond_with @lawsuits
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
    client = Client.find(params[:client_id])
    @lawsuit = client.lawsuits.create!(lawsuit_params)
    add_slug
    respond_with(@lawsuit)
  end

  def update
    @lawsuit.update_attributes(lawsuit_params)
    respond_with @lawsuit
  end

  def destroy
    @lawsuit.destroy
    flash.keep[:notice] = "Ärende #{@lawsuit.name} är raderat."
    respond_with @lawsuit
  end

  private

  def lawsuit_params
    params.require(:lawsuit).permit(:lawsuit_type_id,
                                    :closed,
                                    :court,
                                    :case_number)
  end

  def search_lawsuits
    @lawsuits = []
    @lawsuits = if params[:search]
      if params[:all] == "true"
        Lawsuit.search(params[:search]).sorted
      else
        Lawsuit.search(params[:search]).active
      end
    else
      if params[:all] == "true"
        Lawsuit.all.sorted
      else
        Lawsuit.all.active.sorted
      end
    end.page(params[:page]).per_page(20)

    # @lawsuits =
    #   if params[:search].present?
    #     Lawsuit.joins(:lawsuit_type).merge(LawsuitType.order(name: :asc)).search(params[:search])
    #   else
    #     # Lawsuit.includes(:lawsuit_types).order("lawsuit_types.name").all
    #     Lawsuit.joins(:lawsuit_type).merge(LawsuitType.order(name: :asc)).all
    #   end.active.page(params[:page]).per_page(20)
  end

  def fetch_lawsuit
    @lawsuit = Lawsuit.find(params[:id])
  end

  def links
    [{ id: rand(100), name: "Ärenden", path: lawsuits_path }]
  end

  def props
    { lawsuit: prepare(@lawsuit, LawsuitShowSerializer, root: false),
      tasks: prepare_array(@lawsuit.tasks.sorted_by_date),
      price_categories: prepare_array(PriceCategory.all) }
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
