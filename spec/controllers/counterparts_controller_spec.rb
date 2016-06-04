require "rails_helper"

RSpec.describe CounterpartsController, type: :controller do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }
  let(:lawsuit) { create(:lawsuit, primary_client: client, user: user) }
  let(:counterpart) { create(:counterpart, firm: firm) }

  # Create another client.
  let(:another_firm) { create(:another_firm) }
  let(:another_user) { create(:user, firm: another_firm) }
  let(:another_counterpart) { create(:counterpart, firm: another_firm) }


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
  describe "DELETE destroy" do
    context "when not signed in" do
      it "should not delete the counterpart" do
        delete :destroy, format: :json, id: counterpart.id
        expect(response).to have_http_status(401)
        expect(Counterpart.where(id: counterpart.id)).to exist
      end
    end

    context "when signed in" do
      it "should delete the counterpart" do
        sign_in user
        delete :destroy, format: :json, id: counterpart.id
        expect(Counterpart.where(id: counterpart.id)).to be_empty
      end

      it "should not delete counterpart if lawsuit id is provided" do
        Involvement.create!(lawsuit_id: lawsuit.id, counterpart_id: counterpart.id)
        sign_in user
        delete :destroy, format: :json, id: counterpart.id, lawsuit_id: lawsuit.id
        expect(Counterpart.where(id: counterpart.id)).to exist
        expect(Involvement.where(lawsuit_id: lawsuit.id, counterpart_id: counterpart.id)).to be_empty
      end

      it "should not delete other firms counterpart" do
        sign_in user
        delete :destroy, format: :json, id: another_counterpart.id
        expect(response).to have_http_status(404)
        expect(Counterpart.where(id: another_counterpart.id)).not_to be_empty
      end
    end
  end
end
