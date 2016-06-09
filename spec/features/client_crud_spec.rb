require "rails_helper"
require "requests_helper"

RSpec.feature "Create new client", type: :feature, js: true do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { build_stubbed(:client) }

  scenario "with valid input" do
    LawsuitType.create!(name: "Bodelning")
    sign_in_with(user.email, user.password)
    expect(page).to have_content("Ärenden")
    click_link "Klienter"
    create_client_with(client)
    expect(page).to have_content("Klient sparad")
    expect(page).to have_selector("input[value='#{client.first_name}']")
    expect(page).to have_selector("input[value='#{client.last_name}']")
    expect(page).to have_selector("input[value='#{client.personal_number}']")
    expect(page).to have_selector("input[value='#{client.email}']")
    expect(page).to have_selector("input[value='#{client.co}']")
    expect(page).to have_selector("input[value='#{client.street}']")
    expect(page).to have_selector("input[value='#{client.post_code}']")
    expect(page).to have_selector("input[value='#{client.city}']")
    expect(page).to have_selector("textarea", text: client.note)
    click_link "Klienter"
    expect(page).to have_content(client.last_name)
    click_link "#{client.last_name}, #{client.first_name}"
  end

  scenario "without first name" do
    sign_in_with(user.email, user.password)
    client.first_name = nil
    create_client_with(client)
    expect(page).to have_content("Förnamn måste anges.")
  end

  scenario "without last name" do
    sign_in_with(user.email, user.password)
    client.last_name = nil
    create_client_with(client)
    expect(page).to have_content("Efternamn måste anges.")
  end

  scenario "without personal number" do
    sign_in_with(user.email, user.password)
    client.personal_number = nil
    create_client_with(client)
    expect(page).to have_content("Personnummer måste anges")
  end

  scenario "with wrong personal number format" do
    sign_in_with(user.email, user.password)
    client.personal_number = "8810158589"
    create_client_with(client)
    expect(page).to have_content("Personnummer har fel format.")
  end

  scenario "followed by update" do
    sign_in_with(user.email, user.password)
    create_client_with(client)
    expect(page).to have_selector("input[value='#{client.first_name}']")
    fill_in "Förnamn", with: "Ett annat namn"
    click_button "Uppdatera"
    expect(page).to have_content("Klient uppdaterad")
    expect(Client.where(first_name: "Ett annat namn")).to exist
  end

  scenario "followed by delete" do
    sign_in_with(user.email, user.password)
    create_client_with(client)
    click_link "Radera klient"
    expect(page).to have_content("Bekräfta borttagning")
    click_button "Radera"
    expect(page).to have_content("Klientregister")
    expect(page).to have_content("#{client.first_name} #{client.last_name} är raderad.")
  end
end
