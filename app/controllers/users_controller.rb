class UsersController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    render json: User.in_same_firm(current_user).order(first_name: :asc)
  end

  def show
  end

  def edit
  end

  def update
  end
end
