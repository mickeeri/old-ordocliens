class ClientsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_clients

  respond_to :json, :html

  def index

    # @clients.meta = {
    #   currentPage: @clients.current_page,
    #   nextPage: @clients.next_page,
    #   previousPage: @clients.previous_page,
    #   totalPages: @clients.total_pages,
    #   totalEntries: @clients.total_entries
    # }

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



    # @clients = {
    #   clients: @clients,
    #   meta: {
    #     currentPage: @clients.current_page,
    #     nextPage: @clients.next_page,
    #     previousPage: @clients.previous_page,
    #     totalPages: @clients.total_pages,
    #     totalEntries: @clients.total_entries
    #   }
    # }




    # respond_to do |format|
    #   format.html
    #   format.json {
    #     render json: {
    #       clients: @clients,
    #       meta: {
            # currentPage: @clients.current_page,
            # nextPage: @clients.next_page,
            # previousPage: @clients.previous_page,
            # totalPages: @clients.total_pages,
            # totalEntries: @clients.total_entries
    #       }
    #     }
    #   }
    # end
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
    end.sorted.page(params[:page]).per_page(20)
  end
end
