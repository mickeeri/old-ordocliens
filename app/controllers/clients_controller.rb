class ClientsController < ApplicationController
  before_action :authenticate_user!


  def index
    render json: {
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

  def show
    @client = Client.find(params[:id])
  end

  def new
  end

  private

  def search_clients
    @clients = if params[:search].present?
      Client.search(params[:search])
    else
      Client.all
    end.sorted.page(params[:page])
  end
end
