require "rails_helper"

RSpec.describe LegalCasesController, type: :controller do
  let(:legal_case) do
    create(:legal_case)
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
        get :show, id: legal_case.id, client_id: client.id
        expect(response).to_not be_success
        expect(response).to redirect_to(new_user_session_path)
        expect(flash[:alert]).to be_present
      end
    end

    context "when signed in" do
      it "should succeed" do
        sign_in user
        get :show, id: legal_case.id, client_id: client.id
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "DELETE destroy" do
    context "when not signed in" do
      it "should not delete the legal_case" do
        delete :destroy, format: :json, id: legal_case.id, client_id: client.id
        expect(response).to have_http_status(401)
        expect(LegalCase.where(id: legal_case.id)).to exist
      end
    end

    context "when signed in" do
      it "should delete the legal_case" do
        sign_in user
        delete :destroy, format: :json, id: legal_case.id, client_id: client.id
        expect(LegalCase.where(id: legal_case.id)).to be_empty
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
            id: legal_case.id,
            client_id: client.id,
            legal_case: new_attributes,
            format: :json
        expect(response).to have_http_status(401)
        legal_case.reload
        expect(legal_case.name).to_not eq("Edited name")
        expect(legal_case.closed).to_not eq(false)
      end
    end

    context "when signed in" do
      it "should update legal case" do
        sign_in user
        put :update,
            id: legal_case.id,
            client_id: client.id,
            legal_case: new_attributes,
            format: :json
        expect(response).to have_http_status(204)
        legal_case.reload
        expect(legal_case.name).to eq("Edited name")
        expect(legal_case.closed).to eq(false)
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
            id: legal_case.id,
            client_id: client.id,
            legal_case: new_attributes_with_id,
            format: :json
        legal_case.reload
        expect(legal_case.id).to_not eq(89)
      end
    end
  end
end
