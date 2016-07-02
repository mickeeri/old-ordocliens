class ReportsController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_report_data, only: [:time_report, :work_report]
  respond_to :docx

  def time_report
    headers["Content-Disposition"] =
      "attachment; filename=\"Tidrapport-#{@lawsuit.slug}.docx\""
    @price_categories = PriceCategory.all.sorted
    @expenses = @lawsuit.expenses.sorted
  end

  def work_report
    headers["Content-Disposition"] =
      "attachment; filename=\"Arbetsrapport-#{@lawsuit.slug}.docx\""
  end

  def letter_template
    @client = Client.within_firm(current_user).find(params[:id])
    headers["Content-Disposition"] =
      "attachment; filename=\"Brevmall-#{@client.last_name}.docx\""
  end

  private

  def fetch_report_data
    @lawsuit = Lawsuit.within_firm(current_user).find(params[:id])
    @tasks = @lawsuit.tasks.sorted_by_date
  end
end
