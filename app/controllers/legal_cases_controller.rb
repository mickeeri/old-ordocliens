class LegalCasesController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_legal_case, only: [:show, :update, :destroy, :report]
  respond_to :json, :html, :docx

  def index
    @legal_cases = Client.find(params[:client_id]).legal_cases
    respond_with @legal_cases
  end

  def show
    respond_to do |format|
      format.html do
        render component: "LegalCaseShow", props: props
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

  def report
    @price_categories = PriceCategory.all
    respond_to do |format|
      format.docx do
        render docx: 'report', filename: 'Kostnadsuträkning.docx', word_template: 'custom.docx'
      end
    end
  end

  private

  def legal_case_params
    params.require(:legal_case).permit(:name, :closed, :court, :case_number)
  end

  def fetch_legal_case
    @legal_case = LegalCase.find(params[:id])
  end

  def links
    name = "#{@legal_case.client.first_name} #{@legal_case.client.last_name}"
    [{ id: rand(100), name: "Klienter", path: clients_path },
     {  id: rand(100),
        name: name,
        path: client_path(@legal_case.client.id) }]
  end

  def props
    { init_legal_case: prepare(@legal_case, LegalCaseSerializer, root: false),
      client_id: @legal_case.client.id,
      tasks: prepare_array(@legal_case.tasks.sorted_by_date),
      price_categories: prepare_array(PriceCategory.all),
      links: links }
  end
end
