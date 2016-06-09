require "rails_helper"

RSpec.describe ClientFundsController, type: :controller do
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
           client_fund: { entry: "Lorem ipsum",
                          balance: "3200.40",
                          date: "2016-06-09" }
      expect(response).to have_http_status(201)
    end

    it "should succeed also with comma seperated negative number" do
      sign_in user
      post :create,
           lawsuit_id: lawsuit.id,
           format: :json,
           client_fund: { entry: "Lorem ipsum",
                          balance: "-3200,40",
                          date: "2016-06-09" }
      expect(response).to have_http_status(201)
    end
  end
end
