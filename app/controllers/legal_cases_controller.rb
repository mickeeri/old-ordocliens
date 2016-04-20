class LegalCasesController < ApplicationController
  before_action :authenticate_user!

  def show
    legal_case = LegalCase.find(params[:id])
    respond_to do |format|
      format.html { render component: "LegalCaseShow", props:
        { legal_case: legal_case,
          links: [
            { id: rand(100), name: "Klienter", path: clients_path },
            { id: rand(100), name: "#{legal_case.client.first_name} #{legal_case.client.last_name}", path: client_path(legal_case.client.id) }
          ]
        } }
      format.json { render json: { legal_case: legal_case } }
    end
  end
end
