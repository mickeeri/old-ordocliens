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
          respond_with Client.all.sorted
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.html do
        render component: "ClientShow", props: {
          initial_client: prepare(@client, ClientShowSerializer, root: false),
          links: [{ id: rand(100), name: "Klienter", path: clients_path }],
          counterparts: prepare_array(Counterpart.where(lawsuit: @client.lawsuits)) }
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
    @client.destroy
    flash.keep[:notice] = "#{@client.first_name} #{@client.last_name} är raderad."
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
      :lawsuit_id)
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

  def get_counterparts
    counterparts = []
    @client.lawsuits.each do |lawsuit|
      counterparts.push(lawsuit.counterparts)
    end
    return counterparts;
  end

  def add_client_to_lawsuit
    lawsuit = Lawsuit.find(client_params[:lawsuit_id])
    @client.lawsuits << lawsuit unless
      @client.lawsuits.include?(lawsuit)
  end
end
