require "rails_helper"
require "requests_helper"

RSpec.describe "LawsuitsRequest", type: :request, js: true do
  describe "GET lawsuits index" do
    create_clients
    it "should only include own firms lawsuits" do
      login user
      get lawsuits_path
      expect(response).to have_http_status(200)
      expect(response.body).to include(lawsuit.slug)
      expect(response.body).not_to include(another_lawsuit.slug)
    end
  end
end
