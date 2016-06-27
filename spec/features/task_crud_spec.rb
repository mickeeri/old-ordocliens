require "rails_helper"
require "requests_helper"

RSpec.feature "Create new task", type: :feature, js: true do
  let(:task) { build_stubbed(:task) }
  let(:price_cat) { "Arbete" }
  let(:another_price_cat) { "Tidspillan" }

  scenario "with valid input shuld succeed" do
    create_client_and_lawsuit
    create_price_categories
    create_task_with(task.date, task.entry, task.worked_hours, price_cat)
    expect(page).to have_content("Arbete sparat")
    expect(page).to have_content(task.date)
    expect(page).to have_content(task.entry)
    expect(page).to have_content("Arbete")
    expect(page).to have_content(task.worked_hours.to_s.tr(".", ","))
  end

  scenario "without entry should fail" do
    create_client_and_lawsuit
    create_price_categories
    create_task_with(task.date, "", task.worked_hours, "Arbete")
    expect(page).to have_content("Formuläret innehåller fel.")
    expect(page).to have_content("Notering måste anges.")
  end

  scenario "without worked hours should fail" do
    create_client_and_lawsuit
    create_price_categories
    create_task_with(task.date, task.entry, "", "Arbete")
    expect(page).to have_content("Formuläret innehåller fel.")
    expect(page).to have_content("Arbetade timmar måste anges.")
  end

  scenario "with non numeric worked hours should fail" do
    create_client_and_lawsuit
    create_price_categories
    create_task_with(task.date, task.entry, "adadad", "Arbete")
    expect(page).to have_content("Formuläret innehåller fel.")
    expect(page).to have_content("Arbetade timmar måste vara ett nummer.")
  end

  scenario "followed by update should succeed" do
    # Create new task
    create_client_and_lawsuit
    create_price_categories
    create_task_with(task.date, task.entry, task.worked_hours, price_cat)
    find(".fa-pencil-square-o").click

    # Check for pre-filled input fields.
    page.has_field?("Datum", with: task.date)
    page.has_field?("Notering", with: task.entry)
    page.has_field?("Arbetad tid", with: task.worked_hours)
    page.has_select?("Kategori", selected: price_cat)

    # Update values
    new_date = "2014-05-25"
    new_entry = "A new entry for the task..."
    new_worked_hours = "5,5"
    new_price_cat = another_price_cat
    fill_in "Datum", with: new_date
    fill_in "Notering", with: new_entry
    fill_in "Arbetad tid", with: new_worked_hours
    select new_price_cat, from: "Kategori"
    click_button "Spara"

    # Assert feedback and new content.
    expect(page).to have_content("Arbete uppdaterat!")
    check_page_after_update(new_date, new_entry, new_worked_hours, new_price_cat)
    expect(Task.where(entry: new_entry)).to exist
    expect(Task.where(entry: task.entry)).not_to exist

    # Check if updates remains after toggle between info and time page.
    click_link "Info"
    click_link "Tidrapportering"
    check_page_after_update(new_date, new_entry, new_worked_hours, new_price_cat)
  end

  def create_task_with(date, entry, worked_hours, price_cat)
    click_button "Lägg till arbete"
    fill_in "Datum", with: date
    fill_in "Notering", with: entry
    fill_in "Arbetad tid", with: worked_hours
    select price_cat, from: "Kategori"
    click_button "Spara"
  end

  def create_price_categories
    PriceCategory.create(name: "Arbete")
    PriceCategory.create(name: "Tidspillan")
  end

  def check_page_after_update(new_date,
                              new_entry,
                              new_worked_hours,
                              new_price_cat)
    expect(page).to have_content(new_date)
    expect(page).to have_content(new_entry)
    expect(page).to have_content(new_worked_hours)
    expect(page).to have_content(new_price_cat)
  end
end
