class ClientsController < ApplicationController
  #before_action :authenticate

  def index
    @clients = Client.all
  end

  def show
    @client = Client.find(params[:id])
  end

  def new
  end
end
