require "rails_helper"

RSpec.feature "Create new client", type: :feature, js: true do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }

  scenario "with valid input" do
    LawsuitType.create!(name: "Bodelning")
    sign_in_with(user.email, user.password)
    expect(page).to have_content("Ärenden")
    click_link "Klienter"
    expect(page).to have_content("Klientregister")
    click_link "Lägg till klient"
    expect(page).to have_content("Lägg till klient")
    fill_in "Förnamn", with: "Mikael"
    fill_in "Efternamn", with: "Eriksson"
    fill_in "Personnummer", with: "881015-8272"
    fill_in "E-post", with: "mikael@mail.com"
    fill_in "Mobil", with: "070-8964598"
    fill_in "Gatuadress", with: "Södra gatan 10 lgh 1301"
    fill_in "Postnummer", with: "25254"
    fill_in "Ort", with: "Stockholm"
    fill_in "Anteckningar", with: "Lorem ipsum..."
    click_button "Spara klient"
    expect(page).to have_content("Klient sparad")
    expect(page).to have_selector("input[value='Mikael']")
    expect(page).to have_selector("input[value='Eriksson']")

    click_link "Klienter"
    expect(page).to have_content("Eriksson")

    click_link "Eriksson, Mikael"


    find('#add-lawsuit-button').click
    expect(page).to have_content("Lägg till ärende")
    page.has_select?('#lawsuitTypes', :selected => 'Välj en ärendetyp')
    select "Bodelning", from: "lawsuitTypes"
    fill_in "Domstol", with: "Stockholms tingsrätt"
    fill_in "Målnummer", with: "T12313"
    click_button "Spara ärende"
    expect(page).to have_content("Ärende sparat")
    expect(page).to have_content("Bodelning")
  end

  scenario "without first name" do
    sign_in_with(user.email, user.password)
    expect(page).to have_content("Ärenden")
    click_link "Klienter"
    expect(page).to have_content("Klientregister")
    click_link "Lägg till klient"
    fill_in "Efternamn", with: "Eriksson"
    fill_in "Personnummer", with: "881015-8272"
    click_button "Spara klient"
    expect(page).to have_content("Förnamn måste anges.")
  end


  def sign_in_with(email, password)
    visit("/")
    fill_in "E-post", with: email
    fill_in "Lösenord", with: password
    click_button "Logga in"
  end
end
