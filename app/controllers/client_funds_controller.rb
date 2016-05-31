class ClientFundsController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_client_fund, only: [:destroy, :update]
  respond_to :json

  def index
    @client_funds = Lawsuit
                    .within_firm(current_user)
                    .find(params[:lawsuit_id])
                    .client_funds.sorted
    balance_sum = @client_funds.sum(:balance)
    render json: {
      clientFundsArray: prepare_array(@client_funds),
      sum: balance_sum }
  end

  def create
    lawsuit = Lawsuit.within_firm(current_user).find(params[:lawsuit_id])
    @client_fund = lawsuit.client_funds.create!(client_fund_params)
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
end
