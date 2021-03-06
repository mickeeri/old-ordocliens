class ClientFundsController < ApplicationController
  include ActionView::Helpers::NumberHelper
  before_action :convert_balance, only: [:create, :update]
  before_action :authenticate_user!
  before_action :fetch_client_fund, only: [:destroy, :update]
  respond_to :json

  def index
    @client_funds = Lawsuit
                    .within_firm(current_user)
                    .find(params[:lawsuit_id])
                    .client_funds.sorted
    balance_sum = number_to_currency(@client_funds.sum(:balance), delimiter: " ")
    render json: {
      clientFundsArray: prepare_array(@client_funds),
      sum: balance_sum }
  end

  def create
    lawsuit = Lawsuit.within_firm(current_user).find(params[:lawsuit_id])
    @client_fund = lawsuit.client_funds.create(client_fund_params)
    respond_with(lawsuit, @client_fund)
  end

  def destroy
    @client_fund.destroy
    respond_with @client_fund
  end

  def update
    @client_fund.update_attributes(client_fund_params)
    respond_with @client_fund
  end

  private

  def client_fund_params
    params.require(:client_fund).permit(:date, :entry, :balance)
  end

  def fetch_client_fund
    @client_fund = ClientFund.within_firm(current_user).find(params[:id])
  end

  def convert_balance
    if params[:client_fund][:balance]
      params[:client_fund][:balance] = params[:client_fund][:balance].tr(",", ".")
    end
  end
end
