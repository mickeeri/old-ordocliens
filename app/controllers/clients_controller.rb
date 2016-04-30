class ClientsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_clients, only: [:index]
  before_action :fetch_client, only: [:show, :update, :destroy]
  # before_action :fetch_data, only: [:index]
  respond_to :json, :html

  def index
    respond_to do |format|
      format.html do
        render component: "ClientsIndex", props:
          { clients: prepare_array(@clients),
            meta: pagination_dict(@clients) }
      end
      format.json do
        render json: { clients: @clients, meta: pagination_dict(@clients) }
      end
    end
  end

  def show
    respond_to do |format|
      format.html do
        render component: "ClientShow", props: {
          initial_client: prepare(@client, ClientShowSerializer, root: false),
          links: [{ id: rand(100), name: "Klienter", path: clients_path }] }
      end
      format.json do
        render json: { client: @client, serializer: ClientShowSerializer }
      end
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
    @clients =
      if params[:search].present?
        Client.search(params[:search])
      else
        Client.all
      end.sorted.page(params[:page]).per_page(20)
  end

  def fetch_client
    @client = Client.find(params[:id])
  end

  def default_serializer_options
    { root: false }
  end
end
