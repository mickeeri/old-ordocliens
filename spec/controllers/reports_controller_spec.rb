require "rails_helper"
require "requests_helper"

RSpec.describe ReportsController, type: :controller do
  create_lawsuits

  describe "GET time report" do
    context "when not signed in" do
      it "should fail" do
        get :time_report, id: lawsuit.id
        expect(response).to_not be_success
        expect(response).to redirect_to(new_user_session_path)
        expect(flash[:alert]).to be_present
      end
    end

    context "when signed in" do
      it "should succeed" do
        sign_in user
        get :time_report, id: lawsuit.id, format: :docx
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end

      it "should not time_report other firms reports" do
        sign_in user
        get :time_report, id: another_lawsuit.id
        expect(response).to have_http_status(404)
      end
    end
  end

  describe "GET work report" do
    context "when not signed in" do
      it "should fail" do
        get :work_report, id: lawsuit.id
        expect(response).to_not be_success
        expect(response).to redirect_to(new_user_session_path)
        expect(flash[:alert]).to be_present
      end
    end

    context "when signed in" do
      it "should succeed" do
        sign_in user
        get :work_report, id: lawsuit.id, format: :docx
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end

      it "should not work report other firms reports" do
        sign_in user
        get :work_report, id: another_lawsuit.id
        expect(response).to have_http_status(404)
      end
    end
  end
end
