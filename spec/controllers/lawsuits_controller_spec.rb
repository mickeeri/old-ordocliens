require "rails_helper"

RSpec.describe LawsuitsController, type: :controller do
  let(:lawsuit) do
    create(:lawsuit)
  end

  let(:user) do
    create(:user)
  end

  let(:client) do
    create(:client)
  end

  it { should use_before_action(:authenticate_user!) }

  describe "GET show" do
    context "when not signed in" do
      it "should fail" do
        get :show, id: lawsuit.id, client_id: client.id
        expect(response).to_not be_success
        expect(response).to redirect_to(new_user_session_path)
        expect(flash[:alert]).to be_present
      end
    end

    context "when signed in" do
      it "should succeed" do
        sign_in user
        get :show, id: lawsuit.id, client_id: client.id
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "DELETE destroy" do
    context "when not signed in" do
      it "should not delete the lawsuit" do
        delete :destroy, format: :json, id: lawsuit.id, client_id: client.id
        expect(response).to have_http_status(401)
        expect(LegalCase.where(id: lawsuit.id)).to exist
      end
    end

    context "when signed in" do
      it "should delete the lawsuit" do
        sign_in user
        delete :destroy, format: :json, id: lawsuit.id, client_id: client.id
        expect(LegalCase.where(id: lawsuit.id)).to be_empty
      end
    end
  end

  describe "PUT #update" do
    let(:new_attributes) do
      { name: "Edited name", active: false }
    end

    context "when not signed in" do
      it "should not edit the legal case" do
        put :update,
            id: lawsuit.id,
            client_id: client.id,
            lawsuit: new_attributes,
            format: :json
        expect(response).to have_http_status(401)
        lawsuit.reload
        expect(lawsuit.name).to_not eq("Edited name")
        expect(lawsuit.closed).to_not eq(false)
      end
    end

    context "when signed in" do
      it "should update legal case" do
        sign_in user
        put :update,
            id: lawsuit.id,
            client_id: client.id,
            lawsuit: new_attributes,
            format: :json
        expect(response).to have_http_status(204)
        lawsuit.reload
        expect(lawsuit.name).to eq("Edited name")
        expect(lawsuit.closed).to eq(false)
      end

      let(:new_attributes_with_id) do
        {
          id: 89,
          last_name: "Edited last name",
          first_name: "Edited first name",
          user_id: 500
        }
      end

      it "should not be able to edit id attribute" do
        sign_in user
        put :update,
            id: lawsuit.id,
            client_id: client.id,
            lawsuit: new_attributes_with_id,
            format: :json
        lawsuit.reload
        expect(lawsuit.id).to_not eq(89)
      end
    end
  end
end
