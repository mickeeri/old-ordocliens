# RSpec.feature "User visits default page", js: true do
#   let(:user) do
#     create(:user)
#   end
#
#   let(:client) do
#     create(:client)
#   end
#
#   it "should display client" do
#     sign_in_with(user.email, user.password)
#     expect(page).to have_content("Logga ut")
#     expect(page).to have_content(client.first_name)
#   end
#
#
#
#   def sign_in_with(email, password)
#     visit "/"
#     fill_in "Email", with: email
#     fill_in "Password", with: password
#     click_button "Logga in"
#   end
# end
