require "rails_helper"

RSpec.describe ExpensesController, type: :controller do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }
  let(:lawsuit) { create(:lawsuit, user: user, primary_client: client) }

  describe "POST create" do
    it "should succeed" do
      sign_in user
      post :create,
           lawsuit_id: lawsuit.id,
           format: :json,
           expense: { entry: "Lorem ipsum",
                      price: "3200.40" }
      expect(response).to have_http_status(201)
    end

    it "should succeed also with comma seperated number" do
      sign_in user
      post :create,
           lawsuit_id: lawsuit.id,
           format: :json,
           expense: { entry: "Lorem ipsum",
                      price: "3200,40" }
      expect(response).to have_http_status(201)
    end
  end
end
