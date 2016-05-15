class LawsuitsController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_lawsuit, only: [:show,
                                       :update,
                                       :destroy,
                                       :report,
                                       :client_list]
  respond_to :json, :html, :docx

  def index
    respond_to do |format|
      format.html do
        render component: "LawsuitsIndex"
      end
      format.json do
        @lawsuits = Client.find(params[:client_id]).lawsuits
        respond_with @lawsuits
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

  # def report
  #   @price_categories = PriceCategory.all
  #   respond_to do |format|
  #     format.docx do
  #       render docx: "report",
  #              filename: "Kostnadsuträkning.docx",
  #              word_template: "custom.docx"
  #     end
  #   end
  # end

  private

  def lawsuit_params
    params.require(:lawsuit).permit(:name, :closed, :court, :case_number)
  end

  def fetch_lawsuit
    @lawsuit = Lawsuit.find(params[:id])
  end

  def links
    [{ id: rand(100), name: "Ärenden", path: lawsuits_path }]
  end

  def props
    { initial_lawsuit: prepare(@lawsuit, LawsuitSerializer, root: false),
      tasks: prepare_array(@lawsuit.tasks.sorted_by_date),
      price_categories: prepare_array(PriceCategory.all),
      links: links }
  end

  # Buildning slug with initials, year and id.
  # Should be in model, but cannot access current_user there.
  def add_slug
    initials = current_user.first_name[0,1].downcase <<
      current_user.last_name[0,1].downcase
    slug = @lawsuit.created_at.strftime("#{initials}%y-#{@lawsuit.id.to_s}")
    @lawsuit.update(slug: slug)
  end
end
