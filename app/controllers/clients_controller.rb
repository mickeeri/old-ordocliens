class ClientsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_clients

  respond_to :json, :html

  def index
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

    respond_to do |format|
      format.html { render component: "ClientsIndex", props: {data: @data}, tag: 'div'}
      format.json { render json: @data }
    end
  end

  def show
    @client = Client.find(params[:id])
    @contacts = []
    @client.contacts.each do |contact|
      contactInfo = {
        id: contact.id,
        contact_type: contact.contact_type.contact_type_name,
        contact: contact.contact
      }
      @contacts.push(contactInfo)
    end
  end

  def new
  end

  def destroy
    client = Client.find(params[:id])
    client.destroy
    flash.keep[:notice] = "#{client.first_name} #{client.last_name} är raderad."
    render json: { status: 200 }
  end

  private

  def search_clients
    @clients = if params[:search].present?
      Client.search(params[:search])
    else
      Client.all
    end.sorted.page(params[:page]).per_page(20)
  end
end
