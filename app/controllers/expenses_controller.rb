class ExpensesController < ApplicationController
  before_action :authenticate_user!
  before_action :convert_price, only: [:create, :update]
  before_action :fetch_expense, only: [:destroy, :update]
  respond_to :json

  def index
    @expenses = Lawsuit
                .within_firm(current_user)
                .find(params[:lawsuit_id])
                .expenses.sorted
    respond_with @expenses
  end

  def create
    lawsuit = Lawsuit.within_firm(current_user).find(params[:lawsuit_id])
    @expense = lawsuit.expenses.create(expense_params)
    respond_with(lawsuit, @expense)
  end

  def destroy
    @expense.destroy
    respond_with @expense
  end

  def update
    @expense.update_attributes(expense_params)
    respond_with @expense
  end

  private

  def expense_params
    params.require(:expense).permit(:entry, :price)
  end

  def fetch_expense
    @expense = Expense.within_firm(current_user).find(params[:id])
  end

  def convert_price
    if params[:expense][:price]
      params[:expense][:price] = params[:expense][:price].tr(",", ".")
    end
  end
end
