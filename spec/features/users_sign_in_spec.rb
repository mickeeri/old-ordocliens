require "rails_helper"

RSpec.feature "User signs in", type: :feature do
  let(:user) do
    create(:user)
  end

  scenario "with valid username and password" do
    sign_in_with(user.email, user.password)
    expect(page).to have_content("Logga ut")
  end

  scenario "with invalid password" do
    sign_in_with(user.email, "invalid_password")
    expect(page).to have_content("Invalid email or password.")
    expect(page).to have_content("Logga in")
  end

  scenario "with invalid username" do
    sign_in_with("invalid_username", user.password)
    expect(page).to have_content("Invalid email or password.")
    expect(page).to have_content("Logga in")
  end

  scenario "with blank password" do
    sign_in_with(user.email, "")
    expect(page).to have_content("Logga in")
  end

  scenario "with blank username" do
    sign_in_with("", user.password)
    expect(page).to have_content("Logga in")
  end

  scenario "followed by log out" do
    sign_in_with(user.email, user.password)
    click_link "Logga ut"
    expect(page).to have_content("Logga in")
  end
  
  def sign_in_with(email, password)
    visit "/"
    fill_in "Email", with: email
    fill_in "Password", with: password
    click_button "Logga in"
  end
end
