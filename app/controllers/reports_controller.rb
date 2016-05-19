class ReportsController < ApplicationController
  respond_to :json, :html, :docx
  def show
    @lawsuit = Lawsuit.find(params[:id])
    headers["Content-Disposition"] = "attachment; filename=\"Rapport-#{@lawsuit.slug}.docx\""
    @tasks = @lawsuit.tasks.sorted_by_date
    @price_categories = PriceCategory.all.sorted
    @expenses = @lawsuit.expenses.sorted
  end

  def cover
    @lawsuit = Lawsuit.find(params[:id])
    headers["Content-Disposition"] = "attachment; filename=\"Aktomslag-#{@lawsuit.slug}.docx\""
    @tasks = @lawsuit.tasks.sorted_by_date
    @price_categories = PriceCategory.all.sorted
    @expenses = @lawsuit.expenses.sorted
  end
end
