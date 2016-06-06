require "rails_helper"
require "requests_helper"

RSpec.feature "Create new lawsuit", type: :feature, js: true do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { build_stubbed(:client) }
  let(:lawsuit) { build_stubbed(:lawsuit) }

  scenario "with valid input" do
    LawsuitType.create!(name: "Bodelning")
    sign_in_with(user.email, user.password)
    create_client_with(client)
    expect(page).to have_content("Ärenden")
    expect(page).to have_content("Lägg till ärende")
    create_lawsuit_with(lawsuit, "Bodelning")
    expect(page).to have_content("Ärende sparat")
    expect(page).to have_content("Bodelning")
  end

  scenario "followed by update" do
    LawsuitType.create!(name: "Bodelning")
    LawsuitType.create!(name: "God man")
    sign_in_with(user.email, user.password)
    create_client_with(client)
    create_lawsuit_with(lawsuit, "Bodelning")
    click_link "Bodelning"
    expect(page).to have_content("Arbeten")
    expect(page).to have_content("Utlägg")
    expect(page).to have_content("Klientmedel")
    find('#info-link').click
    expect(page).to have_content("Klient")
    expect(page).to have_content("Motpart")
    select "God man", from: "lawsuitTypes"
    click_button "Uppdatera"
    expect(page).to have_content("Ärende uppdaterat")
    page.has_select?('#lawsuitTypes', selected: "God man")
  end

  scenario "followed by delete" do
    LawsuitType.create!(name: "Bodelning")
    LawsuitType.create!(name: "God man")
    sign_in_with(user.email, user.password)
    create_client_with(client)
    create_lawsuit_with(lawsuit, "Bodelning")
    click_link "Bodelning"
    find('#info-link').click
    click_link "Radera ärende"
    click_button "Radera"
    expect(page).to have_content("Ärende raderat.")
  end
end
