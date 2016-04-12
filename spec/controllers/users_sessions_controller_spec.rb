require "rails_helper"

RSpec.describe Users::SessionsController, type: :controller do
  before :each do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end
end
