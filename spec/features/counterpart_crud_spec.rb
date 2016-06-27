require "rails_helper"
require "requests_helper"

RSpec.feature "Create new countepart", type: :feature, js: true do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { build_stubbed(:client) }
  let(:lawsuit) { build_stubbed(:lawsuit) }
  let(:counterpart) { build_stubbed(:counterpart) }

  scenario "with valid input followed by update and delete" do
    LawsuitType.create!(name: "Bodelning")
    sign_in_with(user.email, user.password)
    create_client_with(client)
    create_lawsuit_with(lawsuit, "Bodelning")
    expect(page).to have_content("Ärende sparat")
    click_link "Bodelning"
    expect(page).to have_content("Ärende")
    click_link "Info"
    click_button "Lägg till ny motpart"
    expect(page).to have_content("Lägg till motpart till ärende")
    click_button "Spara motpart"
    expect(page).to have_content("Formuläret innehåller fel.")
    fill_in "Förnamn", with: counterpart.first_name
    fill_in "Efternamn", with: counterpart.last_name
    fill_in "Personnummer", with: counterpart.personal_number
    fill_in "Motpartsombud", with: counterpart.representative
    click_button "Spara motpart"
    expect(page).to have_content(
      "Motpart #{counterpart.first_name} #{counterpart.last_name} tillagd")
    expect(page).to have_content(
      "#{counterpart.first_name} #{counterpart.last_name}")

    # Go to client page, see if counterpart is visible there.
    click_link "#{client.first_name} #{client.last_name} (#{client.personal_number})"
    expect(page).to have_content("#{counterpart.first_name} #{counterpart.last_name}")

    # Go to counterpart page and see if lawsuit is displayed there.
    click_link "#{counterpart.first_name} #{counterpart.last_name} (#{counterpart.personal_number})"
    expect(page).to have_content(lawsuit.slug)
    expect(page).to have_selector("input[value='#{counterpart.first_name}']")
    expect(page).to have_selector("input[value='#{counterpart.last_name}']")
    expect(page).to have_selector("input[value='#{counterpart.personal_number}']")

    # Update
    new_name = "Ett annat namn"
    fill_in "Förnamn", with: new_name
    click_button "Uppdatera"
    expect(page).to have_content("Motpart uppdaterad")
    expect(Counterpart.where(first_name: new_name)).to exist

    # Delete
    click_link "Radera motpart"
    expect(page).to have_content("Är du säker på att du vill radera motpart?")
    click_button "Radera"
    expect(page).to have_content("Motpart raderad")
    expect(Counterpart.where(personal_number: counterpart.personal_number)).to_not exist
  end
end
