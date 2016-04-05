class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # protect_from_forgery with: :null_session
  #include SessionsHelper
  # include Knock::Authenticable

  # private
  #
  # def check_if_logged_in
  #   unless logged_in? # called in sessions_helper
  #     store_location # sessions_helper
  #     #flash[:danger] = "Var god logga in."
  #     redirect_to root_path
  #   end
  #   current_user
  # end
end
