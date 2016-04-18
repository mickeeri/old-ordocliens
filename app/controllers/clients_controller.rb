class ClientsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_clients, only: [:index]
  before_action :fetch_client, only: [:show, :update, :destroy]
  before_action :fetch_data, only: [:index]

  respond_to :json, :html

  def index
    respond_to do |format|
      format.html { render component: "ClientsIndex", props: { data: @data }, tag: "div" }
      format.json { render json: @data }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: { client: @client } }
    end
  end

  def new
    @client = Client.new
    respond_to do |format|
      format.html { render component: "ClientNew", props: { client: @client }, tag: "div" }
      format.json { render json: { client: @client } }
    end
  end

  def create
    @client = current_user.clients.build(client_params)
    if @client.save
      flash[:success] = "Klient sparad!"
      render json: { client: @client, status: 201 }
    else
      respond_with @client
    end
  end

  def update
    @client.update_attributes(client_params)
    respond_with @client
  end

  def destroy
    @client.destroy
    flash.keep[:notice] = "#{@client.first_name}
      #{@client.last_name} är raderad."
    render json: { status: 200 }
  end

  private

  def client_params
    params.require(:client).permit(
      :last_name,
      :first_name,
      :ssn,
      :email,
      :phone_number,
      :street,
      :post_code,
      :city,
      :note)
  end

  def search_clients
    @clients = if params[:search].present?
                 Client.search(params[:search])
               else
                 Client.all
               end.sorted.page(params[:page]).per_page(20)
  end

  def fetch_client
    @client = Client.find(params[:id])
  end

  def fetch_data
    @data = {
      clients: @clients,
      meta: {
        currentPage: @clients.current_page,
        nextPage: @clients.next_page,
        previousPage: @clients.previous_page,
        totalPages: @clients.total_pages,
        totalEntries: @clients.total_entries
      }
    }
  end
end
