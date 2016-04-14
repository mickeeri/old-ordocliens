require "rails_helper"

RSpec.describe ClientsController, type: :controller do
  let(:client) do
    create(:client)
  end

  let(:user) do
    create(:user)
  end

  let(:new_attributes) {
    { last_name: "Edited last name", first_name: "Edited first name" }
  }

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

  describe "DELETE destroy" do
    context "when not signed in" do
      it "should not delete the client" do
        delete :destroy, format: :json, id: client.id
        expect(response).to have_http_status(401)
        expect(Client.where(id: client.id)).to exist
      end
    end

    context "when signed in" do
      it "should delete the client" do
        sign_in user
        delete :destroy, format: :json, id: client.id
        expect(Client.where(id: client.id)).to be_empty
      end
    end
  end
  describe "PUT #update" do
    context "when not signed in" do
      it "should not edit the client" do
        put :update, { id: client.id, client: new_attributes, format: :json }
        expect(response).to have_http_status(401)
        client.reload
        expect(client.last_name).to_not eq("Edited last name")
        expect(client.first_name).to_not eq("Edited first name")
      end
    end

    context "when signed in" do

      it "should update client" do
        sign_in user
        put :update, { id: client.id, client: new_attributes, format: :json }
        expect(response).to have_http_status(200)
        client.reload
        expect(client.last_name).to eq("Edited last name")
        expect(client.first_name).to eq("Edited first name")
      end
      let(:new_attributes_with_id) {
        { id: 89, last_name: "Edited last name", first_name: "Edited first name", user_id: 500 }
      }

      it "should not be able to edit id or user_id attribute" do
        sign_in user
        put :update, { id: client.id, client: new_attributes, format: :json }
        client.reload
        expect(client.id).to_not eq(89)
        expect(client.user_id).to_not eq(500)
      end
    end
  end
end
