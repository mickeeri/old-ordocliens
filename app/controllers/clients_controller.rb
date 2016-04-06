class ClientsController < ApplicationController
  before_action :authenticate_user!

  def index
    @clients = current_user.clients.paginate(page: params[:page]).order("last_name ASC")
  end

  def show    
    @client = Client.find(params[:id])
  end

  def new
  end
end
