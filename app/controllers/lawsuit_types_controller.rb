class LawsuitTypesController < ApplicationController
  respond_to :json

  def index
    render json: LawsuitType.all.sorted
  end
end
