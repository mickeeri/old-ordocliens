class LawsuitsController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_lawsuit, only: [:show, :update, :destroy, :report]
  respond_to :json, :html, :docx

  def index
    @lawsuits = Client.find(params[:client_id]).lawsuits
    respond_with @lawsuits
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
    lawsuit = client.lawsuits.create(lawsuit_params)
    respond_with(lawsuit)
  end

  def update
    @lawsuit.update_attributes(lawsuit_params)
    respond_with @lawsuit
  end

  def destroy
    @lawsuit.destroy
    respond_with @lawsuit
  end

  def report
    @price_categories = PriceCategory.all
    respond_to do |format|
      format.docx do
        render docx: 'report', filename: 'Kostnadsuträkning.docx', word_template: 'custom.docx'
      end
    end
  end

  private

  def lawsuit_params
    params.require(:lawsuit).permit(:name, :closed, :court, :case_number)
  end

  def fetch_lawsuit
    @lawsuit = Lawsuit.find(params[:id])
  end

  def links
    name = "#{@lawsuit.client.first_name} #{@lawsuit.client.last_name}"
    [{ id: rand(100), name: "Klienter", path: clients_path },
     {  id: rand(100),
        name: name,
        path: client_path(@lawsuit.client.id) }]
  end

  def props
    { init_lawsuit: prepare(@lawsuit, LawsuitSerializer, root: false),
      client_id: @lawsuit.client.id,
      tasks: prepare_array(@lawsuit.tasks.sorted_by_date),
      price_categories: prepare_array(PriceCategory.all),
      links: links }
  end
end
