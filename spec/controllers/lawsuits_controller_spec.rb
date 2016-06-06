require "rails_helper"

RSpec.describe LawsuitsController, type: :controller do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }
  let(:lawsuit) { create(:lawsuit, user: user, primary_client: client) }
  let(:task) { create(:task, lawsuit: lawsuit) }
  let(:lawsuit_type) { create(:lawsuit_type) }
  let(:another_lawsuit_type) { create(:another_lawsuit_type) }

  # Create another lawsuit.
  let(:another_firm) { create(:another_firm) }
  let(:another_user) { create(:user, firm: another_firm) }
  let(:another_client) { create(:client, user: another_user) }
  let(:another_lawsuit) do
    create(:lawsuit, user: another_user, primary_client: another_client)
  end

  it { should use_before_action(:authenticate_user!) }

  describe "POST create" do
    let(:lawsuit_attributes) do
      { lawsuit_type_id: lawsuit_type.id,
        court: "Östersunds tingsrätt",
        case_number: "T 123SA" }
    end

    it "should create new lawsuit with slug" do
      sign_in user
      post :create, client_id: client.id,
                    lawsuit: lawsuit_attributes,
                    format: :json
      expect(response).to have_http_status(201)
      lawsuit = Lawsuit.find(assigns(:lawsuit).id)
      lawsuit.reload
      expect(lawsuit.closed).to eq(false)
    end
  end

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
        get :show, id: lawsuit.id
        expect(response).to have_http_status(200)
      end

      it "should not get another firms lawsuit" do
        sign_in user
        get :show, id: another_lawsuit.id
        expect(response).to have_http_status(404)
      end
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
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "DELETE destroy" do
    context "when not signed in" do
      it "should not delete the lawsuit" do
        delete :destroy, format: :json, id: lawsuit.id, client_id: client.id
        expect(response).to have_http_status(401)
        expect(Lawsuit.where(id: lawsuit.id)).to exist
      end
    end

    context "when signed in" do
      it "should delete the lawsuit" do
        sign_in user
        delete :destroy, format: :json, id: lawsuit.id
        expect(Lawsuit.where(id: lawsuit.id)).to be_empty
      end

      it "should not delete other firms lawsuit" do
        sign_in user
        delete :destroy, format: :json, id: another_lawsuit.id
        expect(response).to have_http_status(404)
        expect(Lawsuit.where(id: lawsuit.id)).not_to be_empty
      end
    end
  end

  describe "PUT #update" do
    let(:new_attributes) do
      { lawsuit_type_id: another_lawsuit_type.id, closed: true }
    end

    context "when not signed in" do
      it "should not edit the lawsuit" do
        put :update,
            id: lawsuit.id,
            client_id: client.id,
            lawsuit: new_attributes,
            format: :json
        expect(response).to have_http_status(401)
        lawsuit.reload
        expect(lawsuit.lawsuit_type.name).to_not eq(another_lawsuit_type.name)
        expect(lawsuit.closed).to_not eq(true)
      end
    end

    context "when signed in" do
      it "should update lawsuit" do
        sign_in user
        put :update,
            id: lawsuit.id,
            client_id: client.id,
            lawsuit: new_attributes,
            format: :json
        expect(response).to have_http_status(204)
        lawsuit.reload
        expect(lawsuit.lawsuit_type.name).to eq(another_lawsuit_type.name)
        expect(lawsuit.closed).to eq(true)
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
            lawsuit: new_attributes_with_id,
            format: :json
        lawsuit.reload
        expect(lawsuit.id).to_not eq(89)
      end

      it "should not be able to edit other lawsuit" do
        sign_in user
        put :update,
            id: another_lawsuit.id,
            lawsuit: new_attributes,
            format: :json
        expect(response).to have_http_status(404)
        lawsuit.reload
        expect(lawsuit.id).to_not eq(89)
      end
    end
  end
end
