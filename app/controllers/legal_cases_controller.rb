class LegalCasesController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_legal_case, only: [:show, :update, :destroy]
  respond_to :json, :html

  def show
    respond_to do |format|
      format.html do
        render component: "LegalCaseShow", props: {
          legal_case: @legal_case,
          client_id: @legal_case.client.id,
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
    legal_case = client.legal_cases.build(legal_case_params)
    flash[:success] = "Ärende sparat!" if legal_case.save
    respond_with(client, legal_case)
  end

  def update
    @legal_case.update_attributes(legal_case_params)
    respond_with @legal_case
  end

  def destroy
    @legal_case.destroy
    flash.keep[:notice] = "Ärende #{@legal_case.name} är raderat"
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
end
