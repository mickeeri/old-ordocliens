class ReportsController < ApplicationController
  respond_to :json, :html, :docx
  def show
    @legal_case = LegalCase.find(params[:id]);
  end
end
