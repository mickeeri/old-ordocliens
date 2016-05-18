class ReportsController < ApplicationController
  respond_to :json, :html, :docx
  def show
    headers["Content-Disposition"] = "attachment; filename=\"Rapport.docx\""
    @lawsuit = Lawsuit.find(params[:id])
    @tasks = @lawsuit.tasks.sorted_by_date
    @price_categories = PriceCategory.all.sorted
    @expenses = @lawsuit.expenses.sorted
  end
end
