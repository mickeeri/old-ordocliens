class ReportsController < ApplicationController
  respond_to :json, :html, :docx
  def show
    @legal_case = Lawsuit.find(params[:id]);
  end
end
