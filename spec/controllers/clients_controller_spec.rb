require "rails_helper"

RSpec.describe ClientsController, type: :controller do

  it "should not be able to access index if not logged in" do
    get :index
    expect(response).to redirect_to(root_path)
    expect(flash[:danger]).to be_present
  end
end
