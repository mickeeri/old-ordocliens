require "rails_helper"

RSpec.describe ClientsController, type: :controller do

  let(:client) do
    create(:client)
  end

  let(:user) do
    create(:user)
  end

  it { should use_before_action(:authenticate_user!) }

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

  describe "GET show" do
    context "when not signed in" do
      it "should fail" do
        get :show, id: client.id
        expect(response).to_not be_success
        expect(response).to redirect_to(new_user_session_path)
        expect(flash[:alert]).to be_present
      end
    end

    context "when signed in" do
      it "should succeed" do
        sign_in user
        get :show, id: client.id
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end
    end
  end
end
