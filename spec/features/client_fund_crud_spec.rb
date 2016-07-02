require "rails_helper"
require "requests_helper"

RSpec.feature "Create new client fund", type: :feature, js: true do
  let(:date) { "2015-09-20" }
  let(:entry) { "Lorem ipsum dolor sit amet..." }
  let(:balance) { "3500,90" }
  let(:local_balance) { "3 500,90 kr" }

  scenario "with valid input shuld succeed" do
    create_client_fund_with(date, entry, balance)
    expect(page).to have_content("Klientmedel sparat!")
    # Check page
    expect(page).to have_content(date)
    expect(page).to have_content(entry)
    expect(page).to have_content(local_balance)
    # Check DB
    expect(ClientFund.where(entry: entry)).to exist
  end

  scenario "balance with both comma and dot should succeed" do
    create_client_fund_with(date, entry, "3500.90")
    expect(page).to have_content("Klientmedel sparat!")
    expect(page).to have_content(local_balance)
  end

  scenario "balance withotu dot or comma should succeed" do
    create_client_fund_with(date, entry, "250")
    expect(page).to have_content("Klientmedel sparat!")
    expect(page).to have_content("250,00 kr")
  end

  scenario "without entry should fail" do
    create_client_fund_with(date, "", balance)
    expect(page).to have_content("Formuläret innehåller fel")
    expect(page).to have_content("Notering måste anges.")
    expect(ClientFund.where(balance: balance)).not_to exist

    # But should work shen filling in the required field.
    fill_in "Notering", with: entry
    click_button "Spara"
    expect(page).to have_content("Klientmedel sparat!")
  end

  scenario "without balance should fail" do
    create_client_fund_with(date, entry, "")
    expect(page).to have_content("Formuläret innehåller fel.
      Rätta till dem och försök igen.")
    expect(page).to have_content("Saldo måste anges.")
    expect(ClientFund.where(entry: entry)).not_to exist
  end

  scenario "with non numeric price should fail" do
    create_client_fund_with(date, entry, "ajdakjdalkdjadj")
    expect(page).to have_content("Formuläret innehåller fel.
      Rätta till dem och försök igen.")
    expect(page).to have_content("Saldo måste vara ett nummer.")
    expect(ClientFund.where(entry: entry)).not_to exist
  end

  scenario "followed by update should succeed" do
    new_date = "2016-08-27"
    new_entry = "A new entry string..."
    new_balance = "600"

    # Create new client fund.
    create_client_fund_with(date, entry, balance)

    # Click edit button.
    find(".fa-pencil-square-o").click
    expect(page).to have_content("Redigera klientmedel")

    # Check for pre-filled inputs.
    page.has_field?("Datum", with: date)
    page.has_field?("Notering", with: entry)
    page.has_field?("Saldo", with: balance)

    # Enter new input.
    fill_in "Datum", with: new_date
    fill_in "Notering", with: new_entry
    fill_in "Saldo", with: new_balance
    click_button "Spara"

    # Check if page is updated
    expect(page).to have_content("Klientmedel uppdaterat!")
    check_page_after_update(new_date, new_entry, new_balance, date, entry, balance)

    # Visit the info page...
    click_link "Info"
    click_link "Tidrapportering"

    # ...changes should remain.
    check_page_after_update(new_date, new_entry, new_balance, date, entry, balance)
  end

  scenario "followed by delete should succeed" do
    create_client_fund_with(date, entry, balance)
    find(".fa-times").click
    expect(page).to have_content("Är du säker på att du vill radera klientmedel?")
    click_button "Radera"
    expect(page).to have_content("Raderade klientmedel")
    expect(page).not_to have_content(entry)
    expect(page).not_to have_content(balance)
    expect(Expense.where(entry: entry)).not_to exist

    # Visit the info page...
    click_link "Info"
    click_link "Tidrapportering"

    # ...changes should remain.
    expect(Expense.where(entry: entry)).not_to exist
  end

  def create_client_fund_with(date, entry, balance)
    create_client_and_lawsuit
    click_button "Lägg till klientmedel"
    fill_in "Datum", with: date
    fill_in "Notering", with: entry
    fill_in "Saldo", with: balance
    click_button "Spara"
  end

  def check_page_after_update(new_date,
                              new_entry,
                              new_balance,
                              old_date,
                              old_entry,
                              old_balance)
    expect(page).to have_content(new_date)
    expect(page).to have_content(new_entry)
    expect(page).to have_content(new_balance)
    expect(page).not_to have_content(old_date)
    expect(page).not_to have_content(old_entry)
    expect(page).not_to have_content(old_balance)
    expect(ClientFund.where(entry: new_entry)).to exist
    expect(ClientFund.where(entry: old_entry)).not_to exist
  end
end
