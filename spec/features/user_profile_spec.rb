require "rails_helper"

RSpec.feature "User visits user profile page", type: :feature do
  let(:user) do
    create(:user)
  end

  scenario "and should see edit user form with email filled in" do
    sign_in_with(user.email, user.password)
    click_link "Ändra mina uppgifter"
    expect(page).to have_content("Ändra mina uppgifter")
    expect(page).to have_selector("input[value='#{user.email}']")
  end

  scenario "and changes password with valid info" do
    sign_in_with(user.email, user.password)
    click_link "Ändra mina uppgifter"
    change_password_with("newpassword", "newpassword", user.password)
    expect(page).to have_content("Your account has been updated successfully.")
    # Logout and login with new password.
    click_link "Logga ut"
    sign_in_with(user.email, "newpassword")
    expect(page).to have_content("Logga ut")
  end

  scenario "and changes password with non matching password confirmation" do
    sign_in_with(user.email, user.password)
    click_link "Ändra mina uppgifter"
    change_password_with("newpassword", "anotherpassword", user.password)
    expect(page).to have_content("Password confirmation doesn't match")
    # Logout and login with new password.
    click_link "Logga ut"
    sign_in_with(user.email, "newpassword")
    expect(page).to have_content("Logga in")
  end

  scenario "and changes password with invalid current password should fail" do
    sign_in_with(user.email, user.password)
    click_link "Ändra mina uppgifter"
    change_password_with("newpassword", "newpassword", "invalidpassword")
    expect(page).to have_content("Current password is invalid")
    # Logout and login with new password.
    click_link "Logga ut"
    sign_in_with(user.email, "newpassword")
    expect(page).to have_content("Logga in")
  end

  def change_password_with(password, password_confirmation, current_password)
    fill_in "Password", with: password
    fill_in "Password confirmation", with: password_confirmation
    fill_in "Current password", with: current_password
    click_button "Uppdatera"
  end

  def sign_in_with(email, password)
    visit "/"
    fill_in "Email", with: email
    fill_in "Password", with: password
    click_button "Logga in"
  end
end
