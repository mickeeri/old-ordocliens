require "rails_helper"
require "requests_helper"

RSpec.feature "Create new expense", type: :feature, js: true do
  let(:expense) { attributes_for(:expense) }

  scenario "with valid input shuld succeed" do
    create_expense
    expect(page).to have_content("Utlägg sparat!")
    # Check page
    expect(page).to have_content(expense[:entry])
    expect(page).to have_content(expense[:price])
    # Check DB
    expect(Expense.where(entry: expense[:entry])).to exist
  end

  scenario "price with both comma and dot should succeed" do
    expense[:price] = "50.50"
    create_expense
    expect(page).to have_content("Utlägg sparat!")

    expense[:price] = "50,50"
    create_more_expenses
    expect(page).to have_content("Utlägg sparat!")

    expense[:price] = "50"
    create_more_expenses
    expect(page).to have_content("Utlägg sparat!")
  end

  scenario "without entry should fail" do
    expense[:entry] = ""
    create_expense
    expect(page).to have_content("Formuläret innehåller fel")
    expect(page).to have_content("Notering måste anges.")
    expect(Expense.where(entry: expense[:entry])).not_to exist
  end

  scenario "without price should fail" do
    expense[:price] = ""
    create_expense
    expect(page).to have_content("Formuläret innehåller fel")
    expect(page).to have_content("Kostnad måste anges.")
    expect(Expense.where(entry: expense[:entry])).not_to exist
  end

  scenario "with non numeric price should fail" do
    expense[:price] = "asdasdadadadasda"
    create_expense
    expect(page).to have_content("Formuläret innehåller fel")
    expect(page).to have_content("Kostnad måste vara ett nummer.")
    expect(Expense.where(entry: expense[:entry])).not_to exist
  end

  scenario "followed by update should succeed" do
    new_entry = "A new entry string..."
    new_price = "600"
    create_expense
    find(".fa-pencil-square-o").click
    expect(page).to have_content("Redigera utlägg")
    # Check for pre-filled inputs.
    expect(page).to have_selector("textarea", text: expense[:entry])
    expect(page).to have_selector("input[value='#{expense[:price].tr(",", ".")}']")
    # Enter new input.
    fill_in "Notering", with: new_entry
    fill_in "Kostnad", with: new_price
    click_button "Spara"
    # Check if page is updated
    expect(page).to have_content("Utläggsrad uppdaterad!")
    check_page_after_update(new_entry, new_price, expense[:entry], expense[:price])
    # Visit the info page...
    click_link "Info"
    click_link "Tidrapportering"
    # ...changes should remain.
    check_page_after_update(new_entry, new_price, expense[:entry], expense[:price])
    expect(Expense.where(entry: new_entry)).to exist
  end

  scenario "followed by delete should succeed" do
    create_expense
    find(".fa-times").click
    expect(page).to have_content("Är du säker på att du vill radera utlägg?")
    click_button "Radera"
    expect(page).to have_content("Raderade utlägg")
    expect(page).not_to have_content(expense[:entry])
    expect(page).not_to have_content(expense[:price])
    expect(Expense.where(entry: expense[:entry])).not_to exist
  end

  def create_expense
    create_client_and_lawsuit
    click_button "Lägg till utlägg"
    fill_in "Notering", with: expense[:entry]
    fill_in "Kostnad", with: expense[:price]
    click_button "Spara"
  end

  def create_more_expenses
    click_button "Lägg till utlägg"
    fill_in "Notering", with: expense[:entry]
    fill_in "Kostnad", with: expense[:price]
    click_button "Spara"
  end

  def check_page_after_update(new_entry, new_price, old_entry, old_price)
    expect(page).to have_content(new_entry)
    expect(page).to have_content(new_price)
    expect(page).not_to have_content(old_entry)
    expect(page).not_to have_content(old_price)
  end
end
