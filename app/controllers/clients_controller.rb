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
          respond_with Client.all.sorted
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
    @client = current_user.clients.build(client_params.except(:lawsuit_id))
    if @client.save
      if client_params[:lawsuit_id]
        add_client_to_lawsuit
      else
        flash[:success] = "Klient sparad!"
      end
    end
    respond_with @client
  end

  def update
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
    lawsuit = Lawsuit.find(params[:id])
    respond_with lawsuit.clients
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
      :note,
      :lawsuit_id
    )
  end

  def search_clients
    @clients = Client.where(nil)
    @clients = @clients.users_clients(current_user) unless params[:all] == "true"
    @clients = @clients.search(params[:search]) if params[:search].present?
    @clients = @clients.sorted.page(params[:page]).per_page(50)
  end

  def fetch_client
    @client = Client.find(params[:id])
  end

  def add_client_to_lawsuit
    lawsuit = Lawsuit.find(client_params[:lawsuit_id])
    # if lawsuit.primary_participation.nil?
    #   # Make client primary client if lawsuit does not have that.
    #   # Participation.create!(
    #   #   lawsuit_id: lawsuit.id,
    #   #   client_id: @client.id,
    #   #   is_primary: true
    #   # )
    # else
    #   # Else just add lawsuit to client.
    #
    # end
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
