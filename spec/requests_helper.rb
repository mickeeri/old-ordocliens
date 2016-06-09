def login(user)
  post_via_redirect user_session_path, "user[email]" => user.email,
                                      "user[password]" => user.password
end

def create_clients
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let!(:client) { create(:client, user: user) }
  let!(:lawsuit) { create(:lawsuit, user: user, primary_client: client) }


  let(:another_firm) { create(:another_firm) }
  let(:another_user) { create(:user, firm: another_firm) }
  let(:another_client) { create(:client, user: another_user) }
  let(:another_lawsuit) do
    create(:lawsuit, user: another_user, primary_client: another_client)
  end
end

def create_lawsuits
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }
  let(:lawsuit) { create(:lawsuit, user: user, primary_client: client) }
  let(:task) { create(:task, lawsuit: lawsuit) }
  let(:lawsuit_type) { create(:lawsuit_type) }
  let(:another_lawsuit_type) { create(:another_lawsuit_type) }

  # Create another lawsuit.
  let(:another_firm) { create(:another_firm) }
  let(:another_user) { create(:user, firm: another_firm) }
  let(:another_client) { create(:client, user: another_user) }
  let(:another_lawsuit) do
    create(:lawsuit, user: another_user, primary_client: another_client)
  end
end

def sign_in_with(email, password)
  visit("/")
  fill_in "E-post", with: email
  fill_in "Lösenord", with: password
  click_button "Logga in"
end

def create_client_with(client)
  click_link "Klienter"
  expect(page).to have_content("Klientregister")
  click_link "Lägg till klient"
  expect(page).to have_content("Lägg till klient")
  fill_in "Förnamn", with: client.first_name if client.first_name
  fill_in "Efternamn", with: client.last_name if client.last_name
  fill_in "Personnummer", with: client.personal_number if client.personal_number
  fill_in "E-post", with: client.email
  fill_in "Mobil", with: client.mobile
  fill_in "C/O", with: client.co
  fill_in "Gatuadress", with: client.street
  fill_in "Postnummer", with: client.post_code
  fill_in "Ort", with: client.city
  fill_in "Anteckningar", with: client.note
  click_button "Spara klient"
end

def create_lawsuit_with(lawsuit, lawsuit_type)
  click_button "Lägg till ärende"
  expect(page).to have_content("Lägg till ärende")
  select lawsuit_type, from: "Ärendetyp"
  fill_in "Domstol", with: lawsuit.court
  fill_in "Målnummer", with: lawsuit.case_number
  click_button "Spara ärende"
end
