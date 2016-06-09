require "rails_helper"

RSpec.describe ClientsController, type: :controller do
  # TODO: Create client.
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }

  # Create another client.
  let(:another_firm) { create(:another_firm) }
  let(:another_user) { create(:user, firm: another_firm) }
  let(:another_client) { create(:client, user: another_user) }

  let(:new_attributes) do
    { last_name: "Edited last name", first_name: "Edited first name" }
  end

  it { should use_before_action(:authenticate_user!) }

  describe "POST create" do
    let(:test_client) { build(:client) }

    it "should succeed" do
      sign_in user
      post :create,
           format: :json,
           user_id: user.id,
           client: { first_name: test_client.first_name,
                     last_name: test_client.last_name,
                     personal_number: test_client.personal_number,
                     street: test_client.street,
                     post_code: test_client.post_code,
                     citry: test_client.city,
                     note: test_client.note,
                     email: test_client.email,
                     phone_number: test_client.phone_number,
                     mobile: test_client.mobile,
                     co: test_client.co
                   }
      expect(response).to have_http_status(201)
    end
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

      it "should not show other firms client" do
        sign_in user
        get :show, id: another_client.id
        expect(response).to have_http_status(404)
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

      it "should not delete other firms client" do
        sign_in user
        delete :destroy, format: :json, id: another_client.id
        expect(response).to have_http_status(404)
        expect(Client.where(id: another_client.id)).not_to be_empty
      end
    end
  end

  describe "PUT #update" do
    context "when not signed in" do
      it "should not edit the client" do
        put :update, id: client.id, client: new_attributes, format: :json
        expect(response).to have_http_status(401)
        client.reload
        expect(client.last_name).to_not eq("Edited last name")
        expect(client.first_name).to_not eq("Edited first name")
      end
    end

    context "when signed in" do
      it "should update client" do
        sign_in user
        put :update, id: client.id, client: new_attributes, format: :json
        expect(response).to have_http_status(204)
        client.reload
        expect(client.last_name).to eq("Edited last name")
        expect(client.first_name).to eq("Edited first name")
      end

      it "should not update other firms client" do
        sign_in user
        put :update, id: another_client.id, client: new_attributes, format: :json
        expect(response).to have_http_status(404)
        another_client.reload
        expect(another_client.last_name).not_to eq("Edited last name")
        expect(another_client.first_name).not_to eq("Edited first name")
      end

      let(:new_attributes_with_id) do
        {
          id: 89,
          last_name: "Edited last name",
          first_name: "Edited first name",
          user_id: 500
        }
      end

      it "should not be able to edit id or user_id attribute" do
        sign_in user
        put :update,
            id: client.id,
            client: new_attributes_with_id,
            format: :json
        client.reload
        expect(client.id).to_not eq(89)
        expect(client.user_id).to_not eq(500)
      end
    end
  end
end
