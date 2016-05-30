class ClientsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_clients, only: [:index]
  before_action :fetch_client, only: [:show, :update, :destroy]
  respond_to :json, :html

  def index
    respond_to do |format|
      format.html do
        render component: "ClientsIndex", props:
          { clients: prepare_array(@clients),
            meta: pagination_dict(@clients) }
      end
      format.json do
        if params[:page].present?
          render json: @clients, meta: pagination_dict(@clients)
        else
          # For dropdown.
          respond_with @clients
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.html do
        render component: "ClientShow", props: show_props
      end
      format.json do
        respond_with @client
      end
    end
  end

  def new
    render component: "ClientNew"
  end

  def create
    @client = current_user.clients.create!(client_params.except(:lawsuit_id))
    # Add client to lawsuit if lawsuit_id is provided.
    if client_params[:lawsuit_id]
      add_client_to_lawsuit
    else
      flash[:success] = "Klient sparad!"
    end
    respond_with @client
  end

  def update
    # Add client to lawsuit if lawsuit_id is provided.
    if client_params[:lawsuit_id]
      add_client_to_lawsuit
    else
      @client.update_attributes(client_params)
    end
    respond_with @client
  end

  def destroy
    if params[:lawsuit_id].present?
      # Delete relation between client and lawsuit.
      Participation.find_by_client_id_and_lawsuit_id(
        params[:id],
        params[:lawsuit_id]).delete
    else
      # Destroy client.
      @client.destroy
      flash.keep[:notice] =
        "#{@client.first_name} #{@client.last_name} är raderad."
    end
    respond_with @client
  end

  def lawsuit_client_list
    # TODO: check if authorized.
    lawsuit = Lawsuit.find(params[:id])
    respond_with lawsuit.clients
  end

  private

  def client_params
    params.require(:client).permit(
      :last_name,
      :first_name,
      :personal_number,
      :email,
      :phone_number,
      :street,
      :post_code,
      :city,
      :note,
      :lawsuit_id
    )
  end

  def search_clients
    @clients = Client.where(user_id: User.in_same_firm(current_user))
    @clients = @clients.users_clients(current_user) unless params[:all] == "true"
    @clients = @clients.search(params[:search]) if params[:search].present?
    @clients = @clients.sorted.page(params[:page]).per_page(50)
  end

  def fetch_client
    # Only look for clients that belongs to users in firm.
    @client = Client.within_firm(current_user).find(params[:id])
  end

  def add_client_to_lawsuit
    lawsuit = Lawsuit.find(client_params[:lawsuit_id])
    @client.lawsuits << lawsuit
    # Add the client to all counterparts involved in lawsuit.
    lawsuit.counterparts.each do |counterpart|
      @client.counterparts << counterpart
    end
  end

  def show_props
    { initial_client: prepare(@client, ClientShowSerializer, root: false),
      lawsuits: prepare_array(@client.lawsuits.sorted) }
  end
end
