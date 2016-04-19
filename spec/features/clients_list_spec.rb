# require "rails_helper"
#
# RSpec.feature "User visits default page", :js => true do
#   it "should display client" do
#     client = create(:client)
#     user = create(:user)
#     login_as(user, :scope => :user, :run_callbacks => false)
#     visit "clients/#{client.id}"
#     expect(User.where(id: client.id)).to exist
#     expect(page).to have_content("Logga ut")
#     expect(page).to have_content(client.first_name)
#   end
# end
