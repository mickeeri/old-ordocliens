class ClientsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_clients, only: [:index]
  before_action :fetch_client, only: [:show, :update, :destroy]
  before_action :fetch_data, only: [:index]
  respond_to :json, :html

  def index
    respond_to do |format|
      format.html { render component: "ClientsIndex", props: { data: @data } }
      format.json { render json: @data }
    end
  end

  def show
    respond_to do |format|
      format.html do
        render component: "ClientShow", props:
          { client: @client,
            legal_cases: @client.legal_cases,
            links: [{ id: rand(100), name: "Klienter", path: clients_path }] }
      end
      format.json { render json: { client: @client } }
    end
  end

  def new
    render component: "ClientNew"
  end

  def create
    @client = current_user.clients.build(client_params)
    flash[:success] = "Klient sparad!" if @client.save
    respond_with @client
  end

  def update
    @client.update_attributes(client_params)
    respond_with @client
  end

  def destroy
    @client.destroy
    flash.keep[:notice] = "#{@client.first_name}
      #{@client.last_name} är raderad."
    respond_with @client
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
