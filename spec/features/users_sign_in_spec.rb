require "rails_helper"

RSpec.feature "User signs in", type: :feature do
  let(:user) do
    create(:user)
  end

  scenario "with valid username and password" do
    sign_in_with(user.user_name, user.password)
    expect(page).to have_content("Alla klienter")
  end

  scenario "with invalid password" do
    sign_in_with(user.user_name, "invalid_password")
    expect(page).to have_content(
      "Kan inte hitta någon användare med de uppgifterna.")
    expect(page).to have_content("Logga in")
  end

  scenario "with invalid username" do
    sign_in_with("invalid_username", user.password)
    expect(page).to have_content(
      "Kan inte hitta någon användare med de uppgifterna.")
    expect(page).to have_content("Logga in")
  end

  scenario "with blank password" do
    sign_in_with(user.user_name, "")
    expect(page).to have_content("Logga in")
  end

  scenario "with blank username" do
    sign_in_with("", user.password)
    expect(page).to have_content("Logga in")
  end

  scenario "followed by log out" do
    sign_in_with(user.user_name, user.password)
    click_link "Logga ut"
    expect(page).to have_content("Logga in")
  end

  def sign_in_with(user_name, password)
    visit root_path
    fill_in "User name", with: user_name
    fill_in "Password", with: password
    click_button "Logga in"
  end
end
