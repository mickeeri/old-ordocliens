class ReportsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json, :html, :docx
  def show
    @lawsuit = Lawsuit.within_firm(current_user).find(params[:id])
    headers["Content-Disposition"] = "attachment; filename=\"Rapport-#{@lawsuit.slug}.docx\""
    @tasks = @lawsuit.tasks.sorted_by_date
    @price_categories = PriceCategory.all.sorted
    @expenses = @lawsuit.expenses.sorted
  end
end
