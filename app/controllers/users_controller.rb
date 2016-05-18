class UsersController < ApplicationController
  respond_to :json, :html

  def index
    render json: User.all.order(first_name: :asc)
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
  end

  def update
  end
end
