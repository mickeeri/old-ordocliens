class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(user_name: params[:session][:user_name])
    if user && user.authenticate(params[:session][:password])
      # Login and redirect to user show page.
      log_in user # called in sessions_helper
      redirect_back_or clients_path
    else
      flash.now[:danger] = "Kan inte hitta någon användare med de uppgifterna."
      render "new"
    end
  end

  def destroy

  end
end
