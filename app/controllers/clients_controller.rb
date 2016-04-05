class ClientsController < ApplicationController
  before_action :check_if_logged_in

  def index
    @clients = current_user.clients.paginate(page: params[:page]).order("last_name ASC")
  end

  def show
    @client = Client.find(params[:id])
  end

  def new
  end
end
