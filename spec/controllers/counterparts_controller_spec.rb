require "rails_helper"

RSpec.describe CounterpartsController, type: :controller do
  let(:firm) do
    create(:firm)
  end

  let(:user) do
    create(:user, firm: firm)
  end

  let(:client) do
    create(:client, user: user)
  end

  let(:lawsuit) do
    create(:lawsuit, primary_client: client)
  end

  describe "GET index" do
    context "when not signed in" do
      it "should fail" do
        get :index
        expect(response).to_not be_success
        expect(response).to redirect_to(new_user_session_path)
        expect(flash[:alert]).to be_present
      end
    end

    context "when signed in" do
      it "should succeed" do
        sign_in user
        get :index
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end
    end
  end
end
