class ExpensesController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    @expenses = Lawsuit.find(params[:lawsuit_id]).expenses.sorted
    respond_with @expenses
  end

  def create
    lawsuit = Lawsuit.find(params[:lawsuit_id])
    @expense = lawsuit.expenses.build(expense_params)
    @expense.save
    respond_with(lawsuit, @expense)
  end

  def destroy
    @expense = Expense.find(params[:id])
    @expense.destroy
    respond_with @expense
  end

  def update
    @expense = Expense.find(params[:id])
    @expense.update_attributes(expense_params)
    respond_with @expense
  end

  private

  def expense_params
    params.require(:expense).permit(:entry, :price)
  end
end
