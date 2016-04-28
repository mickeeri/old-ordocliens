class LegalCasesController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_legal_case, only: [:show, :update, :destroy]
  respond_to :json, :html

  def index
    @legal_cases = Client.find(params[:client_id]).legal_cases
    respond_with @legal_cases
  end

  def show
    respond_to do |format|
      format.html do
        render component: "LegalCaseShow", props: { # TODO: serializer
          legal_case: @legal_case,
          client_id: @legal_case.client.id,
          tasks: prepare_array(@legal_case.tasks.sorted_by_date),
          price_categories: prepare_array(PriceCategory.all),
          links: render_links }
      end
      format.json { render json: { legal_case: @legal_case } }
    end
  end

  def new
    render component: "LegalCaseNew", props: {
      client_id: params[:client_id].to_i }
  end

  def create
    client = Client.find(params[:client_id])
    legal_case = client.legal_cases.create(legal_case_params)
    respond_with(client, legal_case)
  end

  def update
    @legal_case.update_attributes(legal_case_params)
    respond_with @legal_case
  end

  def destroy
    @legal_case.destroy
    respond_with @legal_case
  end

  private

  def legal_case_params
    params.require(:legal_case).permit(:name, :active)
  end

  def fetch_legal_case
    @legal_case = LegalCase.find(params[:id])
  end

  def render_links
    name = "#{@legal_case.client.first_name} #{@legal_case.client.last_name}"
    [{ id: rand(100), name: "Klienter", path: clients_path },
     {  id: rand(100),
        name: name,
        path: client_path(@legal_case.client.id) }]
  end

  def prepare_array(array)
    ActiveModel::ArraySerializer.new(array, each_serializer: serializer(array))
  end

  def prepare(resource)
    serializer(resource).new(resource)
  end

  def serializer(resource)
    if resource.respond_to? :name
      "#{resource.name}Serializer".safe_constantize
    else
      "#{resource.class}Serializer".safe_constantize
    end
  end
end
