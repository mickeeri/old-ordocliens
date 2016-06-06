require "rails_helper"

RSpec.describe ReportsController, type: :controller do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }
  let(:lawsuit) { create(:lawsuit, user: user, primary_client: client) }

  # Create another lawsuit.
  let(:another_firm) { create(:another_firm) }
  let(:another_user) { create(:user, firm: another_firm) }
  let(:another_client) { create(:client, user: another_user) }
  let(:another_lawsuit) do
    create(:lawsuit, user: another_user, primary_client: another_client)
  end

  describe "GET show" do
    context "when not signed in" do
      it "should fail" do
        get :show, id: lawsuit.id
        expect(response).to_not be_success
        expect(response).to redirect_to(new_user_session_path)
        expect(flash[:alert]).to be_present
      end
    end

    context "when signed in" do
      it "should succeed" do
        sign_in user
        get :show, id: lawsuit.id, format: :docx
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end

      it "should not show other firms reports" do
        sign_in user
        get :show, id: another_lawsuit.id
        expect(response).to have_http_status(404)
      end
    end
  end
end
