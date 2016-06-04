require "rails_helper"
require "requests_helper"

RSpec.describe "ClientsRequest", type: :request, js: true do
  describe "GET clients index" do
    create_clients
    it "should only include own firms clients" do
      login user
      get clients_path
      expect(response).to have_http_status(200)
      expect(response.body).to include(client.personal_number)
      expect(response.body).not_to include(another_client.personal_number)

      get clients_path, format: :json
      expect(response).to have_http_status(200)
      expect(response.body).to include(client.personal_number)
      expect(response.body).not_to include(another_client.personal_number)
    end
  end
end
